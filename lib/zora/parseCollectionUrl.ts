import { type Address } from "viem";
import { ZORA_TO_VIEM, type ZoraChains } from "@/lib/consts";
import * as chains from "viem/chains";

export const pattern = /collect\/([^:]+):([^/]+)\/(\d+)/;

function parseCollectionUrl(input: string) {
  const match = input.match(pattern);

  if (!match) return null;
  const chain = match[1] as ZoraChains;
  const collectionAddress = match[2] as Address;
  const tokenId = BigInt(match[3]);

  const viemChain = chains[ZORA_TO_VIEM[chain]];

  return {
    chain: viemChain,
    collectionAddress,
    tokenId,
  };
}

export default parseCollectionUrl;
