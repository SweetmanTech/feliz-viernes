import type { EventType } from ".";
import { getEvents } from "./getEvents";

export async function getEventsForToday(eventType?: EventType) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return getEvents({
    eventType,
    startDate: today,
    endDate: new Date(),
  });
}
