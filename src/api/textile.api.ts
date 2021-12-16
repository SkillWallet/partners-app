import { Buckets } from '@textile/hub';
import { environment } from './environment';

// -- is this correct? new keys for DPAD?
const keyInfo = {
  key: environment.textileKey,
  secret: environment.textileSecret,
};

export async function pushJSONDocument(json, path) {
  let buf: any = '';
  let links: any = '';
  const buckets = await Buckets.withKeyInfo(keyInfo);
  const { root, threadID } = await buckets.getOrCreate(environment.textileSwBucketName);
  console.log(threadID);
  if (!root) throw new Error('bucket not created');
  if (path === `metadata.json`) {
    buf = Buffer.from(JSON.stringify(json, null, 2));
    links = await buckets.pushPath(root.key, path, buf);
  }
  // else if (path === 'skillsMetadata.json') {

  // }
  return `https://hub.textile.io${links.path.path}`;
}

export const pushImage = async (content) => {
  const buckets = await Buckets.withKeyInfo(keyInfo);
  const { root, threadID } = await buckets.getOrCreate(environment.textileSwBucketName);
  if (!root) throw new Error('bucket not created');
  const path = `profile.png`;
  const links = await buckets.pushPath(root.key, path, content);
  return `https://hub.textile.io${links.path.path}`;
};

// export async function pushJSON(json) {
//   const buckets = await Buckets.withKeyInfo(keyInfo)
//   const { root, threadID } = await buckets.getOrCreate(environment.textileSwBucketName)
//   console.log(threadID);
//   if (!root) throw new Error('bucket not created')
// }
