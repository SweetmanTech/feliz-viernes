import { OPEN_AI_MODEL } from "@/lib/consts";
import { openai } from "@/lib/openai/client";
import { getEventsForToday } from "@/lib/stack/getEventsForToday";

export const getCurrentStateOfExecution = async () => {
  const createPosts = await getEventsForToday("create_post");
  const replyPosts = await getEventsForToday("reply_post");
  const systemPrompt = `Reply with the current state of execution in this EXACT format:
  1. Start with "I have completed X goal(s) for today"
  2. Then state "I still need to complete Y other goals, including [list remaining tasks]"
  3. End with "I have posted [N] messages, replied to [M] posts, created [P] images, and posted [Q] images on Zora"

  Compare the current progress against these goals and mark as complete ONLY if the current value meets or exceeds the goal:
  - Posts goal: 111 (current: ${createPosts.length}) ${
    createPosts.length >= 111 ? "✓" : "✗"
  }
  - Replies goal: 33 (current: ${replyPosts.length}) ${
    replyPosts.length >= 33 ? "✓" : "✗"
  }
  - Images goal: 11 (current: 0) ✗
  - Zora posts: 1 (current: 0) ✗

  Total completed goals: ${
    [
      createPosts.length >= 111,
      replyPosts.length >= 33,
      false, // images
      false, // zora
    ].filter(Boolean).length
  }
  Remaining goals: ${
    4 -
    [
      createPosts.length >= 111,
      replyPosts.length >= 33,
      false, // images
      false, // zora
    ].filter(Boolean).length
  }
  
  Example output: I have completed 3 goals for today. I still need to complete A other goals, including creating C images. I have posted B messages, replied to X posts, created Y images, and posted Z images on Zora.`;

  console.log("systemPrompt", systemPrompt);
  const currentStateOfExecution = await openai.chat.completions.create({
    model: OPEN_AI_MODEL,
    messages: [{ role: "system", content: systemPrompt }],
    max_completion_tokens: 1111,
  });
  return currentStateOfExecution.choices[0].message.content;
};
