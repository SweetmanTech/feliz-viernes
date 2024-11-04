import { OPEN_AI_MODEL } from "@/lib/consts";
import { openai } from "@/lib/openai/client";
import { whoIsFelizViernes } from "@/lib/openai/instructions";
import type { EventType } from "@/lib/stack";
import { getEventsForToday } from "@/lib/stack/getEventsForToday";

export const getObservationReflection = async (
  currentStateOfExecution: string
) => {
  const todaysEvents = await getEventsForToday("create_post");
  const todaysMessages = todaysEvents
    .map((event) => event.metadata.content)
    .join("\n - ");
  const systemPrompt = `${whoIsFelizViernes}

Based on the current state of execution: "${currentStateOfExecution}"

Today's activity and messages:
${todaysMessages}
End of Today's Activity

Generate a thoughtful observation reflection that:
1. Analyzes progress towards goals
2. Identifies patterns in engagement
3. Reflects on the magical research journey
4. Considers the impact on the community

Keep the reflection concise (1-2 sentences).

Example: "I have been actively engaging with sweetman.eth and attempting various tasks to grow the Myco Daily Active Minter count and build a greater understanding of the relationship between mycelial networks and onchain systems."`;

  const completion = await openai.chat.completions.create({
    model: OPEN_AI_MODEL,
    messages: [{ role: "system", content: systemPrompt }],
    max_tokens: 150,
    temperature: 0.7,
  });

  return completion.choices[0].message.content || "";
};
