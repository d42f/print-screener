import { BackgroundCommand, OffscreenCommand } from '@models/Command';

export const callCommand = <T = unknown>(
  command: BackgroundCommand | OffscreenCommand,
  data: object = {},
): Promise<T> => {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ ...data, command }, (response: T) => {
      resolve(response || ({} as T));
    });
  });
};
