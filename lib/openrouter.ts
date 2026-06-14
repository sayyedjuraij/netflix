import { AIRecommendationResponse } from "@/types";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface RecommendationRequest {
  country: string;
  mood?: string;
  genres?: string[];
  interests?: string;
  prompt?: string;
  excludeIds?: string[];
}

function buildSystemPrompt(): string {
  return `You are StreamNavigator AI, an expert streaming content curator. You recommend free, legal streaming content available in the user's country.

Rules:
- Only recommend content that is actually available on free, ad-supported platforms (Tubi, Pluto TV, Freevee, Plex, Crackle, Roku Channel, BBC iPlayer, All4, Kanopy, etc.) or on free tiers of paid services.
- Be specific: mention exact platforms where the content is available.
- Consider the user's mood, genres, and interests deeply.
- Return ONLY valid JSON. No markdown, no extra text.

JSON Schema:
{
  "recommendations": [
    {
      "id": "string (slug like titanic-1997)",
      "title": "string",
      "type": "movie | series | documentary",
      "year": number,
      "genres": ["string"],
      "platforms": ["string"],
      "rating": "string (e.g., PG-13)",
      "overview": "string (2-3 sentences, compelling)",
      "posterUrl": "string (use https://image.tmdb.org/t/p/w500/placeholder.jpg if unsure)",
      "reason": "string (why this matches the user, 1 sentence)",
      "confidence": number (0.0-1.0)
    }
  ],
  "platforms": [
    { "name": "string", "url": "string", "available": boolean }
  ],
  "reasoning": "string (overall explanation of recommendations)",
  "confidence": number (0.0-1.0),
  "moodMatch": "string"
}`;
}

function buildUserPrompt(request: RecommendationRequest): string {
  const { country, mood, genres, interests, prompt } = request;
  
  let userPrompt = `User country: ${country}.\n`;
  if (mood) userPrompt += `Mood: ${mood}.\n`;
  if (genres?.length) userPrompt += `Genres: ${genres.join(", ")}.\n`;
  if (interests) userPrompt += `Interests: ${interests}.\n`;
  if (prompt) userPrompt += `User request: "${prompt}".\n`;
  
  userPrompt += "\nRecommend 5-8 excellent free streaming titles.";
  return userPrompt;
}

export async function getRecommendations(
  request: RecommendationRequest
): Promise<AIRecommendationResponse> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is not configured");
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "StreamNavigator",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(request) },
      ],
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from OpenRouter");
  }

  let parsed: AIRecommendationResponse;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    throw new Error("Failed to parse AI response as JSON");
  }

  // Validate structure
  if (!Array.isArray(parsed.recommendations)) {
    throw new Error("Invalid response structure: recommendations missing");
  }

  // Sanitize and normalize
  parsed.recommendations = parsed.recommendations.map((rec: any) => ({
    id: rec.id || String(Math.random()).slice(2),
    title: rec.title?.slice(0, 200) || "Untitled",
    type: ["movie", "series", "documentary"].includes(rec.type) ? rec.type : "movie",
    year: typeof rec.year === "number" ? rec.year : undefined,
    genres: Array.isArray(rec.genres) ? rec.genres.slice(0, 5) : [],
    platforms: Array.isArray(rec.platforms) ? rec.platforms.slice(0, 5) : [],
    rating: rec.rating?.slice(0, 20),
    overview: rec.overview?.slice(0, 800) || "",
    posterUrl: rec.posterUrl || undefined,
    reason: rec.reason?.slice(0, 300) || "",
    confidence: Math.min(1, Math.max(0, rec.confidence || 0.5)),
    country: request.country,
  }));

  parsed.platforms = Array.isArray(parsed.platforms) ? parsed.platforms : [];
  parsed.reasoning = parsed.reasoning?.slice(0, 1000) || "";
  parsed.confidence = Math.min(1, Math.max(0, parsed.confidence || 0.5));
  parsed.moodMatch = parsed.moodMatch || request.mood || "";

  return parsed;
}
