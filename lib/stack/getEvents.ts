import { stack } from "./client";
import type { EventType } from ".";

interface GetEventsOptions {
  eventType?: EventType;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export async function getEvents({
  eventType,
  startDate = new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
  endDate = new Date(),
  limit = 100,
}: GetEventsOptions = {}) {
  try {
    const query = stack
      .eventsQuery()
      .where({
        ...(eventType && { eventType }),
        eventTimestamp: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
      })
      .limit(limit)
      .build();

    const events = await stack.getEvents({ query });
    return events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    throw error;
  }
}
