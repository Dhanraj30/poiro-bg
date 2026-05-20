from fastapi import APIRouter, HTTPException, Depends
from passlib.context import CryptContext
from app.schemas.schemas import UserRegister, UserLogin, TokenResponse
from app.core.database import get_supabase
from app.core.auth import create_access_token, get_current_user
import uuid

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register", response_model=TokenResponse)
async def register(data: UserRegister):
    db = get_supabase()

    # Check duplicate email/username
    existing = db.table("users").select("id").eq("email", data.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")

    existing_un = db.table("users").select("id").eq("username", data.username).execute()
    if existing_un.data:
        raise HTTPException(status_code=400, detail="Username already taken")

    user_id = str(uuid.uuid4())
    hashed = pwd_context.hash(data.password)

    result = db.table("users").insert({
        "id": user_id,
        "email": data.email,
        "username": data.username,
        "password_hash": hashed,
    }).execute()

    user = result.data[0]
    token = create_access_token({"sub": user["id"], "email": user["email"], "username": user["username"]})

    return TokenResponse(
        access_token=token,
        user={"id": user["id"], "email": user["email"], "username": user["username"]}
    )


@router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin):
    db = get_supabase()

    result = db.table("users").select("*").eq("email", data.email).execute()
    if not result.data:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = result.data[0]
    if not pwd_context.verify(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["id"], "email": user["email"], "username": user["username"]})

    return TokenResponse(
        access_token=token,
        user={"id": user["id"], "email": user["email"], "username": user["username"]}
    )


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
