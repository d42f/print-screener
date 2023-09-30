import { CommandAction } from '@models/Command';

export const getMessageListener =
  <T extends string>(actions: Record<T, CommandAction>): Parameters<typeof chrome.runtime.onMessage.addListener>[0] =>
  (message, sender, sendResponse) => {
    actions[message.command as T]?.({ message, sender, sendResponse });
    return true;
  };
