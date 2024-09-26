import { getSSLHubRpcClient, HubEventType } from "@farcaster/hub-nodejs";

const hubRpcEndpoint = "hub-grpc.pinata.cloud";
const client = getSSLHubRpcClient(hubRpcEndpoint);
client.$.waitForReady(Date.now() + 5000, async (e) => {
  if (e) {
    console.error(`Failed to connect to ${hubRpcEndpoint}:`, e);
    process.exit(1);
  } else {
    console.log(`Connected to ${hubRpcEndpoint}`);

    const subscribeResult = await client.subscribe({
      eventTypes: [HubEventType.MERGE_MESSAGE],
    });

    if (subscribeResult.isOk()) {
      const stream = subscribeResult.value;

      for await (const event of stream) {
        if (event.mergeMessageBody.message.data.type === 1) {
          const embeds = event.mergeMessageBody.message.data.castAddBody.embeds;
          if (embeds.length > 0) {
            console.log(embeds);
            console.log(event.mergeMessageBody.message.data.castAddBody.text);
          }
        }
      }
    }

    client.close();
  }
});
console.log("Hello via Bun!");
