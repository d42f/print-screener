import { BackgroundCommand } from '@models/BackgroundCommand';

chrome.runtime.onMessage.addListener(({ command }, sender, sendResponse) => {
  if (command === BackgroundCommand.GetTab) {
    sendResponse({ tab: sender.tab });
  } else if (command === BackgroundCommand.CaptureVisibleTab) {
    chrome.tabs.captureVisibleTab(dataUrl => {
      sendResponse({ dataUrl });
    });
  }
  return true;
});
