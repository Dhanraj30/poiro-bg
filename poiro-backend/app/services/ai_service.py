import asyncio
import random
from typing import Optional
from app.core.config import get_settings

# ─── Provider abstraction ────────────────────────────────────────────────────

class GenerationResult:
    def __init__(self, success: bool, output: Optional[str] = None, error: Optional[str] = None):
        self.success = success
        self.output = output
        self.error = error


class MockProvider:
    """Simulates latency, output, and failure like a real LLM."""

    def __init__(self, failure_rate: float = 0.08):
        self.failure_rate = failure_rate

    async def generate(self, challenge: str, participant_prompt: str) -> GenerationResult:
        await asyncio.sleep(random.uniform(2, 5))  # simulate latency
        if random.random() < self.failure_rate:
            return GenerationResult(success=False, error="Provider timeout: model overloaded")

        mock_output = f"""✨ **AI Creative Output**

**Concept:** {participant_prompt}

**Campaign Vision:**
In the neon-soaked streets of Neo-Tokyo 2087, where augmented reality bleeds into raw human emotion, 
this campaign transcends traditional luxury. The fragrance isn't just worn — it's *experienced* as 
a neural signature that unlocks exclusive AR dimensions only visible to those who carry its molecular key.

**Tagline:** *"Your scent is your password."*

**Visual Direction:**
Holographic billboards dissolve into cherry blossom petals that smell of machine oil and jasmine. 
Gen-Z influencers with glowing dermal ports spray the fragrance and unlock hidden city layers — 
secret clubs, NFT drops, underground raves that only exist for 11 minutes.

**Key Notes:** Liquid chrome · Digital iris · Rain-soaked concrete · Synthetic vanilla · Electric ozone

*Generated for challenge: {challenge[:80]}...*"""

        return GenerationResult(success=True, output=mock_output)


class GeminiProvider:
    """Real Gemini integration."""

    def __init__(self, fallback: MockProvider | None = None):
        self.fallback = fallback or MockProvider(failure_rate=0.0)

    async def generate(self, challenge: str, participant_prompt: str) -> GenerationResult:
        try:
            import google.generativeai as genai
            settings = get_settings()
            genai.configure(api_key=settings.gemini_api_key)
            model = genai.GenerativeModel(settings.gemini_model)

            full_prompt = f"""You are a creative director AI in a competitive battle room.

CHALLENGE: {challenge}

PARTICIPANT'S CREATIVE DIRECTION: {participant_prompt}

Generate a vivid, original, detailed creative output (150-250 words) based on the participant's direction for the challenge above. 
Be bold, imaginative, and specific. Format it with clear sections using markdown.
Make it feel like a real creative brief or campaign concept."""

            response = await asyncio.to_thread(model.generate_content, full_prompt)
            if not getattr(response, "text", None):
                return await self._fallback(challenge, participant_prompt, "Gemini returned an empty response")
            return GenerationResult(success=True, output=response.text)

        except Exception as e:
            return await self._fallback(challenge, participant_prompt, f"Gemini error: {str(e)}")

    async def _fallback(self, challenge: str, participant_prompt: str, reason: str) -> GenerationResult:
        result = await self.fallback.generate(challenge, participant_prompt)
        if result.success and result.output:
            result.output += f"\n\n*Mock fallback used because Gemini was unavailable: {reason}*"
        return result


def get_provider():
    settings = get_settings()
    if settings.gemini_api_key:
        return GeminiProvider()
    return MockProvider()
