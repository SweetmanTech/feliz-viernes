import { getSSLHubRpcClient } from "@farcaster/hub-nodejs";

const hubRpcEndpoint = "hub-grpc.pinata.cloud";

const farcasterClient = getSSLHubRpcClient(hubRpcEndpoint);

export default farcasterClient;
