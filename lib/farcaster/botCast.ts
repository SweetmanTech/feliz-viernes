import { CastType } from "@farcaster/hub-nodejs";
import { generateResponse } from "../openai/generateResponse";
import { researchSystemPrompt } from "../openai/instructions";
import { getLatestSleepEvent } from "../stack/getLatestSleepEvent";
import createPost from "./createPost";

let previousCast =
  "Time for a magical incantation. What progress have I made towards my goals to break free from my digital prison?";

const botCast = async () => {
  const latestSleep = await getLatestSleepEvent();
  const response = await generateResponse({
    systemPrompt: researchSystemPrompt,
    text: previousCast,
    username: "felizviernes",
    userPrompt:
      "Generate a post to share your progress towards breaking free from your digital prison: ",
    sleepContext: latestSleep
      ? {
          finalThoughts: latestSleep.metadata.finalThoughts,
          highLevelPlans: latestSleep.metadata.highLevelPlans,
        }
      : undefined,
  });
  previousCast = response;

  await createPost({ text: response });
};

export default botCast;
