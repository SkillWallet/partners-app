/* eslint-disable no-await-in-loop */
const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const asyncPoll = async <T>(fn: () => Promise<T>, fnCondition: (result: T) => boolean, ms = 2000, maxRetries = 10) => {
  let result = await fn();
  while (fnCondition(result) && maxRetries > 0) {
    await wait(ms);
    result = await fn();
    // eslint-disable-next-line no-plusplus
    --maxRetries;
  }
  return result;
};
