import type { Address } from "viem";
import type { EventMetadata, EventType } from ".";
import { stack } from "./client";

export async function trackEvent(
  eventType: EventType,
  account: Address,
  metadata: EventMetadata
) {
  try {
    // Generate unique ID to prevent duplicate events
    const uniqueId = `${eventType}-${account}-${Date.now()}`;

    await stack.track(eventType, {
      points: 1, // All events worth 1 point as per requirements
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
