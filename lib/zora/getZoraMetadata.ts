import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import parseCollectionUrl from "./parseCollectionUrl";
import { createPublicClient, http } from "viem";
import fetchIpfs from "../fetchIpfs";

async function getZoraMetadata(url: string) {
  const collectionData = parseCollectionUrl(url);
  if (!collectionData) return;

  const { chain, collectionAddress, tokenId } = collectionData;

  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const uri = await client.readContract({
    address: collectionAddress,
    abi: zoraCreator1155ImplABI,
    functionName: "uri",
    args: [tokenId],
  });
  const metadata = await fetchIpfs(uri).then((res) => res.json());
  return metadata;
}

export default getZoraMetadata;
