import OpenAI from "openai";
import {
  defaultSystemPrompt,
  exampleTone,
  getDefaultUserPrompt,
  responseGuidelines,
  whoIsFelizViernes,
} from "./instructions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      model: "gpt-4o-mini",
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
