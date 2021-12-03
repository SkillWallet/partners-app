import { Buckets } from '@textile/hub';

// -- is this correct? new keys for DPAD?
const keyInfo = {
  key: process.env.REACT_APP_TEXTILE_KEY,
  secret: process.env.REACT_APP_TEXTILE_SECRET,
};

export async function pushJSONDocument(json, path) {
  let buf = '';
  let links = '';
  const buckets = await Buckets.withKeyInfo(keyInfo);
  const { root, threadID } = await buckets.getOrCreate(process.env.REACT_APP_BUCKET_NAME);
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

export async function pushImage(content) {
  const buckets = await Buckets.withKeyInfo(keyInfo);
  const { root, threadID } = await buckets.getOrCreate(process.env.REACT_APP_BUCKET_NAME);
  console.log(threadID);
  if (!root) throw new Error('bucket not created');
  const path = `profile.png`;
  const links = await buckets.pushPath(root.key, path, content);
  return `https://hub.textile.io${links.path.path}`;
}

// export async function pushJSON(json) {
//   const buckets = await Buckets.withKeyInfo(keyInfo)
//   const { root, threadID } = await buckets.getOrCreate(process.env.REACT_APP_BUCKET_NAME)
//   console.log(threadID);
//   if (!root) throw new Error('bucket not created')
// }
