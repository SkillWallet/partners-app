import { NFTStorage } from 'nft.storage';

const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_KEY });

export function ipfsCIDToHttpUrl(url: string, isJson: boolean) {
  if (!url.includes('textile'))
    return isJson
      ? `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}/metadata.json`
      : `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`;
  return url;
}

export async function storeMetadata(json) {
  const metadata = await client.store(json);
  return metadata.ipnft;
}
