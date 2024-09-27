import type { HubRpcClient } from "@farcaster/hub-nodejs";

const clientReady = async (client: HubRpcClient) => {
  await new Promise((resolve, reject) => {
    client.$.waitForReady(Date.now() + 5000, async (e) => {
      if (e) {
        console.error(`Farcaster client failed to connect`);
        reject(e);
      }
      console.log(`Farcaster client connected`);
      resolve(true);
    });
  });
};

export default clientReady;
