import { NFTStorage } from 'nft.storage';

const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_KEY });

export function ipfsCIDToHttpUrl(url: string, isJson: boolean) {
  return isJson ?
    `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}/metadata.json` :
    `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`
}

export async function storeMetadata(json) {
  const metadata = await client.store(json);
  return metadata.ipnft;
}
