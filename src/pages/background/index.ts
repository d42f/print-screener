import { BackgroundCommand } from '@models/BackgroundCommand';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === BackgroundCommand.GetTab) {
    sendResponse({ tab: sender.tab });
  }
});
