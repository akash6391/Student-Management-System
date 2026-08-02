from datetime import datetime,timedelta
from typing import Optional
from jose import JWTError,jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"],deprecated ="auto")

SECRET_KEY = "8f7c2d9a4b1e6f3c9d0a7e5b2c8f1d6a9e3b7c4f2a1d8e6b5c9f0a2d7e1b3c4" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
        
    
    to_encode.update({"exp": expire})
    
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt




