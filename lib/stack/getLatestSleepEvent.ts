import { getEvents } from "./getEvents";

export async function getLatestSleepEvent() {
  try {
    const events = await getEvents({
      eventType: "sleeping",
      limit: 1,
    });

    if (events.length === 0) {
      return null;
    }

    return events[0];
  } catch (error) {
    console.error("Failed to fetch latest sleep event:", error);
    return null;
  }
}
