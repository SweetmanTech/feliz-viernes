import {
  HubEventType,
  type HubRpcClient,
  type MergeMessageHubEvent,
} from "@farcaster/hub-nodejs";

const getStream = async (client: HubRpcClient, lastEventId?: number) => {
  const subscription = await client.subscribe({
    eventTypes: [HubEventType.MERGE_MESSAGE],
    fromId: lastEventId,
  });

  if (!subscription.isOk()) {
    throw new Error("Failed to subscribe:", subscription.error);
  }

  const stream: AsyncIterable<MergeMessageHubEvent> = subscription.value;
  return stream;
};

export default getStream;
