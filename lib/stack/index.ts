import { trackEvent } from "./trackEvent";

if (!process.env.STACK_API_KEY || !process.env.STACK_SYSTEM_ID) {
  throw new Error("Stack API key or system ID not configured");
}

export interface EventMetadata {
  content?: string;
  postUrl?: string;
  parentPost?: string;
  sleepDuration?: number;
  finalThoughts?: string;
  highLevelPlans?: string;
}

export type EventType = "create_post" | "reply_post" | "sleeping";

export default {
  trackEvent,
};
