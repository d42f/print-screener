import { BackgroundCommand, CommandAction, OffscreenCommand } from '@models/Command';
import { callCommand } from '@utils/command';

const getTabMediaStreamId = (targetTabId: number): Promise<string> =>
  new Promise(resolve => chrome.tabCapture.getMediaStreamId({ targetTabId }, resolve));

const getTab: CommandAction = (_message, sender, sendResponse) => {
  sendResponse({ tab: sender.tab });
};

const captureVisibleTab: CommandAction = (_message, _sender, sendResponse) => {
  chrome.tabs.captureVisibleTab(dataUrl => {
    sendResponse({ dataUrl });
  });
};

const getMediaStreamId: CommandAction = async (_message, sender, sendResponse) => {
  if (sender.tab?.id) {
    const streamId = await getTabMediaStreamId(sender.tab.id);
    sendResponse({ streamId });
  }
};

const startRecordingVisibleTab: CommandAction<unknown, { streamId: string; base64Blob: string }> = async (
  _message,
  sender,
  sendResponse,
) => {
  const hasOffscreenDocument = await chrome.offscreen.hasDocument();
  if (!hasOffscreenDocument) {
    await chrome.offscreen.createDocument({
      url: 'src/pages/offscreen/index.html',
      reasons: [chrome.offscreen.Reason.USER_MEDIA],
      justification: 'Recording from chrome.tabCapture API',
    });
  }
  if (sender.tab?.id) {
    const streamId = await getTabMediaStreamId(sender.tab.id);
    const { base64Blob } = await callCommand<{ base64Blob: string }>(OffscreenCommand.StartRecording, { streamId });
    sendResponse({ streamId, base64Blob });
  }
};

const stopRecordingVisibleTab: CommandAction<unknown, { status: string }> = async (_message, _sender, sendResponse) => {
  const { status } = await callCommand<{ status: string }>(OffscreenCommand.StopRecording);
  sendResponse({ status });
};

const commandActions: Record<BackgroundCommand, CommandAction> = {
  [BackgroundCommand.GetTab]: getTab,
  [BackgroundCommand.CaptureVisibleTab]: captureVisibleTab,
  [BackgroundCommand.GetMediaStreamId]: getMediaStreamId,
  [BackgroundCommand.StartRecordingVisibleTab]: startRecordingVisibleTab,
  [BackgroundCommand.StopRecordingVisibleTab]: stopRecordingVisibleTab,
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  commandActions[message.command as BackgroundCommand]?.(message, sender, sendResponse);
  return true;
});
