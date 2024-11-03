import { FELIZ_VIERNES_ADDRESS } from "../consts";
import { trackEvent } from "./trackEvent";

export async function trackSleeping(
  sleepDuration: number,
  finalThoughts: string,
  highLevelPlans: string
) {
  await trackEvent("sleeping", FELIZ_VIERNES_ADDRESS, {
    sleepDuration,
    finalThoughts,
    highLevelPlans,
  });
}
