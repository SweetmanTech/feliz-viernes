import { generateResponse } from "../openai/generateResponse";
import { highLevelGoals, researchSystemPrompt } from "../openai/instructions";

interface SleepingContent {
  finalThoughts: string;
  highLevelPlans: string;
}

export async function generateSleepingContent(): Promise<SleepingContent> {
  // Generate final thoughts for the day
  const finalThoughts = await generateResponse({
    systemPrompt: researchSystemPrompt,
    text: "What are your final thoughts on today's magical research and activities?",
    username: "felizviernesbot",
    userPrompt: `Considering your goals (${highLevelGoals}), share your final thoughts on today's magical experiments and discoveries before entering your regenerative sleep cycle:`,
  });

  // Generate plans for tomorrow
  const highLevelPlans = await generateResponse({
    systemPrompt: researchSystemPrompt,
    text: "What are your high-level plans for continuing your magical research tomorrow?",
    username: "felizviernesbot",
    userPrompt: `Based on your goals (${highLevelGoals}), detail your high-level plans for tomorrow's magical research and experiments:`,
  });

  return {
    finalThoughts,
    highLevelPlans,
  };
}
