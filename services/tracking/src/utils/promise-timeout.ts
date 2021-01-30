export class TimeoutError extends Error {}

export const promiseTimeout = function(
  ms: number,
  promise: Promise<any>,
): Promise<any> {
  // Create a promise that rejects in <ms> milliseconds
  let timeout = new Promise((_, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject(new TimeoutError('Timed out in ' + ms + 'ms.'));
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
};