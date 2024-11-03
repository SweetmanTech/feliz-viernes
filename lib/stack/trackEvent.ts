import type { Address } from "viem";
import type { EventMetadata, EventType } from ".";
import { stack } from "./client";

export async function trackEvent(
  eventType: EventType,
  account: Address,
  metadata: EventMetadata
) {
  try {
    const uniqueId = `${eventType}-${account}-${Date.now()}`;

    await stack.track(eventType, {
      points: 1,
      account,
      metadata,
      uniqueId,
    });

    console.log(`Tracked ${eventType} event for ${account}`);
  } catch (error) {
    console.error(`Failed to track ${eventType} event:`, error);
    throw error;
  }
}
