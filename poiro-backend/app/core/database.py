from supabase import Client, create_client

from app.core.config import get_settings


_client: Client | None = None


def get_supabase() -> Client:
    global _client
    if _client is None:
        settings = get_settings()
        key = settings.supabase_service_key or settings.supabase_anon_key
        _client = create_client(settings.supabase_url, key)
    return _client
