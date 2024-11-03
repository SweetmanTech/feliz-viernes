import { trackSleeping } from "../stack/trackSleeping";
import { generateSleepingContent } from "../openai/generateSleepingContent";

const sleep = async () => {
  const sleepDuration = 11000;

  const { finalThoughts, highLevelPlans } = await generateSleepingContent();
  console.log("finalThoughts", finalThoughts);
  console.log("highLevelPlans", highLevelPlans);
  await trackSleeping(sleepDuration, finalThoughts, highLevelPlans);
  await new Promise((resolve) => setTimeout(resolve, sleepDuration));
};

export default sleep;
