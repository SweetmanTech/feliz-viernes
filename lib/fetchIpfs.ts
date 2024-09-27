const thirdwebId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;

const fetchIpfs = (hash: string) => {
  const httpLink =
    hash?.indexOf?.("ipfs://") > -1
      ? hash.replace("ipfs://", `https://${thirdwebId}.ipfscdn.io/ipfs/`)
      : hash;
  return fetch(httpLink);
};

export default fetchIpfs;
