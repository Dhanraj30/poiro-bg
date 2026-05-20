import asyncio
from datetime import datetime
from app.core.database import get_supabase
from app.core.socket_manager import emit_job_update
from app.services.ai_service import get_provider


async def run_generation_job(submission_id: str, room_id: str, challenge: str, participant_prompt: str):
    """
    Async worker that runs outside the request cycle.
    Updates job state in Supabase and broadcasts via Socket.IO at each step.
    """
    db = get_supabase()
    provider = get_provider()

    async def update_job(status: str, output=None, error=None):
        data = {"status": status, "updated_at": datetime.utcnow().isoformat()}
        if output:
            data["generated_output"] = output
        if error:
            data["error_message"] = error
        db.table("submissions").update(data).eq("id", submission_id).execute()
        await emit_job_update(room_id, submission_id, status, output, error)

    try:
        # Mark as running
        await update_job("running")

        # Set a 30s timeout
        result = await asyncio.wait_for(
            provider.generate(challenge, participant_prompt),
            timeout=30.0
        )

        if result.success:
            await update_job("completed", output=result.output)
        else:
            await update_job("failed", error=result.error)

    except asyncio.TimeoutError:
        await update_job("timed_out", error="Generation timed out after 30 seconds. Please retry.")
    except Exception as e:
        await update_job("failed", error=f"Unexpected error: {str(e)}")
