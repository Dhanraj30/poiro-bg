from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    supabase_url: str
    supabase_service_key: str
    supabase_anon_key: str
    database_url: str | None = None
    jwt_secret: str = "dev-secret-change-in-prod"
    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.5-flash"
    frontend_url: str = "http://localhost:3000"
    environment: str = "development"
    app_name: str = "Poiro Battle Room"

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
