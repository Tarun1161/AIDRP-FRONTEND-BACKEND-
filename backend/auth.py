import time
import jwt
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET = "change-me-in-production"
ALGORITHM = "HS256"
security = HTTPBearer()


def create_token(username: str, role: str) -> str:
    payload = {
        "sub": username,
        "role": role,
        "iat": int(time.time()),
        "exp": int(time.time()) + 60 * 60 * 8,  # 8 hours
    }
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


def get_current_user(creds: HTTPAuthorizationCredentials = Depends(security)):
    token = creds.credentials
    try:
        data = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        return {"username": data["sub"], "role": data.get("role", "User")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")