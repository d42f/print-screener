/* eslint-disable @typescript-eslint/no-explicit-any */
import { BackgroundCommand, OffscreenCommand } from '@models/Command';

export const callCommand = <T extends object>(
  command: BackgroundCommand | OffscreenCommand,
  data: object = {},
): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ ...data, command }, (response: T) => {
      console.log({ response });
      if ('error' in response) {
        reject(response.error);
      } else {
        resolve(response || ({} as T));
      }
    });
  });
};
