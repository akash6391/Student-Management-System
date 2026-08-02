from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.user import User
from app.utils import security

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # JWT Decode
        payload = jwt.decode(
            token,
            security.SECRET_KEY,
            algorithms=[security.ALGORITHM]
        )

        email: str = payload.get("user")

        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise credentials_exception

    return user


class RoleChecker:
    def __init__(self, allowed_roles: list):
        self.allowed_roles = allowed_roles

    def __call__(self, user: User = Depends(get_current_user)):
        if user.role.value not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Allowed roles: {', '.join(self.allowed_roles)}"
            )

        return user

# 1. Single Role Checkers
allow_admin = RoleChecker(["Admin"])
allow_teacher = RoleChecker(["Teacher"])
allow_student = RoleChecker(["Student"])
allow_parent = RoleChecker(["Parent"])

# 2. Combined Role Checkers (For shared features)
# Admin ya Teacher 
allow_admin_or_teacher = RoleChecker(["Admin", "Teacher"])

# Student aur Parent (jaise Grade card ya Attendance history dekhne ke liye)
allow_student_or_parent = RoleChecker(["Student", "Parent"])

# 3. Universal Access (System ke kisi bhi logged-in user ke liye, e.g., Profile View)
allow_all_roles = RoleChecker(["Admin", "Teacher", "Student", "Parent"])
