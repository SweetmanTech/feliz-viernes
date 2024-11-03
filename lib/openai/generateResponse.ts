import { defaultSystemPrompt, getDefaultUserPrompt } from "./instructions";
import { openai } from "./client";
import { OPEN_AI_MODEL } from "../consts";

interface GenerateResponseProps {
  systemPrompt?: string;
  text: string;
  username: string;
  userPrompt?: string;
  sleepContext?: {
    finalThoughts: string;
    highLevelPlans: string;
  };
}

export async function generateResponse({
  systemPrompt,
  text,
  username,
  userPrompt,
  sleepContext,
}: GenerateResponseProps): Promise<string> {
  try {
    const messages = [
      { role: "system", content: systemPrompt || defaultSystemPrompt },
    ] as any[];
    // Add sleep context if available
    if (sleepContext) {
      messages.push({
        role: "system",
        content: `Recent thoughts: ${sleepContext.finalThoughts}\nCurrent plans: ${sleepContext.highLevelPlans}`,
      });
    }

    messages.push({
      role: "user",
      content: userPrompt || getDefaultUserPrompt(username, text),
    });

    const response = await openai.chat.completions.create({
      model: OPEN_AI_MODEL,
      messages,
      temperature: 0.7,
      max_completion_tokens: 88,
    });

    return response.choices[0].message.content || "✨ *magical silence* ✨";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "⌐Ⓕ-Ⓥ My magical energies are depleted. Please try again later. ✨";
  }
}
