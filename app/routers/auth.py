from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

# Humare banaye hue modules import kar rahe hain
from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.schemas.token import Token
from app.utils import security
from fastapi.security import OAuth2PasswordRequestForm

# APIRouter humari APIs ko group karne mein madad karta hai
router = APIRouter(
    
    tags=["Authentication"] # Swagger UI mein is naam se grouping hogi
)

# ==========================================
# 1. REGISTER API (Naya Account Banana)
# ==========================================
@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # 1. Check karein ki kya ye username pehle se exist karta hai
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already register")
    
    # 2. Password ko encrypt (hash) karein
    hashed_password = security.get_password_hash(user.password)
    
    # 3. Database mein naya user save karein
    new_user = User(
        name=user.name,
        email=user.email,
        hash_password=hashed_password,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user) # ID generate hone ke baad use wapas laayein
    
    return new_user # Password hide hokar sirf UserResponse schema return hoga


# ==========================================
# 2. LOGIN API (Token Generate Karna)
# ==========================================
@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user or not security.verify_password(
        form_data.password,
        user.hash_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = security.create_access_token(
        data={
            "user": user.email,
            "role": user.role.value
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role" : user.role.value
    }