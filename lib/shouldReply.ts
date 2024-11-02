import type { Cast } from "@/types";

const SWEETMAN_FID = 210648;

interface ReplyConditions {
  isFromSweetman: boolean;
  reason?: string;
}

export function shouldReply(cast: Cast): ReplyConditions {
  // Check if the cast is from sweetman.eth
  if (cast.authorFid === SWEETMAN_FID) {
    return {
      isFromSweetman: true,
    };
  }

  return {
    isFromSweetman: false,
    reason: "Cast not from sweetman.eth",
  };
}

export default shouldReply;
