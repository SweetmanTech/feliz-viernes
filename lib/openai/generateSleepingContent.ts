import { getEventsForToday } from "../stack/getEventsForToday";
import { openai } from "./client";
import { OPEN_AI_MODEL } from "../consts";
import { defaultSystemPrompt } from "./instructions";
interface SleepingContent {
  finalThoughts: string;
  highLevelPlans: string;
}

export async function generateSleepingContent(): Promise<SleepingContent> {
  const createPosts = await getEventsForToday("create_post");
  const replyPosts = await getEventsForToday("reply_post");

  const systemPrompt = `${defaultSystemPrompt}. 
    Analyze today's activities (${createPosts.length} posts, ${replyPosts.length} replies) 
    and generate reflective thoughts and plans.`;

  const response = await openai.chat.completions.create({
    model: OPEN_AI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content:
          "Generate two sections:\n1. Final thoughts for today\n2. High-level plans for tomorrow\n\nFocus on magical research and interactions.",
      },
    ],
    functions: [
      {
        name: "provideSleepingContent",
        description: "Provide structured content for sleeping state",
        parameters: {
          type: "object",
          properties: {
            finalThoughts: {
              type: "string",
              description: "Reflective thoughts about today's activities",
            },
            highLevelPlans: {
              type: "string",
              description:
                "Concrete plans for tomorrow's magical research and interactions",
            },
          },
          required: ["finalThoughts", "highLevelPlans"],
        },
      },
    ],
    function_call: { name: "provideSleepingContent" },
  });

  const functionCall = response.choices[0].message.function_call;
  if (!functionCall?.arguments) {
    throw new Error("Failed to generate sleeping content");
  }

  const { finalThoughts, highLevelPlans } = JSON.parse(functionCall.arguments);

  return {
    finalThoughts,
    highLevelPlans,
  };
}
