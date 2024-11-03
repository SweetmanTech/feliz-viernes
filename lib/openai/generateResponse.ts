import { defaultSystemPrompt, getDefaultUserPrompt } from "./instructions";
import { openai } from "./client";
import { OPEN_AI_MODEL } from "../consts";

interface GenerateResponseProps {
  systemPrompt?: string;
  text: string;
  username: string;
  userPrompt?: string;
}

export async function generateResponse({
  systemPrompt,
  text,
  username,
  userPrompt,
}: GenerateResponseProps): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: OPEN_AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt || defaultSystemPrompt },
        {
          role: "user",
          content: userPrompt || getDefaultUserPrompt(username, text),
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 88,
    });

    return response.choices[0].message.content || "✨ *magical silence* ✨";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "⌐Ⓕ-Ⓥ My magical energies are depleted. Please try again later. ✨";
  }
}
