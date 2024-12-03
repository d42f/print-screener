import { BackgroundCommand, CommandAction, OffscreenCommand } from '@models/Command';
import { callCommand } from '@utils/command';
import { getMessageListener } from '@utils/message';

const getTabMediaStreamId = (targetTabId: number): Promise<string> =>
  new Promise(resolve => chrome.tabCapture.getMediaStreamId({ targetTabId }, resolve));

const getTab: CommandAction = ({ sender, sendResponse }) => {
  sendResponse({ tab: sender.tab });
};

const captureVisibleTab: CommandAction = ({ sendResponse }) => {
  chrome.tabs.captureVisibleTab(dataUrl => {
    sendResponse({ dataUrl });
  });
};

const getMediaStreamId: CommandAction = async ({ sender, sendResponse }) => {
  if (sender.tab?.id) {
    const streamId = await getTabMediaStreamId(sender.tab.id);
    sendResponse({ streamId });
  }
};

const startRecordingVisibleTab: CommandAction<void, { streamId: string; base64Blob: string }> = async ({
  sender,
  sendResponse,
}) => {
  const hasOffscreenDocument = await chrome.offscreen.hasDocument();
  if (!hasOffscreenDocument) {
    await chrome.offscreen.createDocument({
      url: 'src/pages/offscreen/index.html',
      reasons: [chrome.offscreen.Reason.USER_MEDIA],
      justification: 'Recording from chrome.tabCapture API',
    });
  }
  if (sender.tab?.id) {
    try {
      const streamId = await getTabMediaStreamId(sender.tab.id);
      const { base64Blob } = await callCommand<{ base64Blob: string }>(OffscreenCommand.StartRecording, { streamId });
      sendResponse({ streamId, base64Blob });
    } catch (error) {
      console.log({ error, id: sender.tab?.id });
    }
  }
};

const stopRecordingVisibleTab: CommandAction<void, { status: string }> = async ({ sendResponse }) => {
  const { status } = await callCommand<{ status: string }>(OffscreenCommand.StopRecording);
  sendResponse({ status });
};

chrome.runtime.onMessage.addListener(
  getMessageListener<BackgroundCommand>({
    [BackgroundCommand.GetTab]: getTab,
    [BackgroundCommand.CaptureVisibleTab]: captureVisibleTab,
    [BackgroundCommand.GetMediaStreamId]: getMediaStreamId,
    [BackgroundCommand.StartRecordingVisibleTab]: startRecordingVisibleTab,
    [BackgroundCommand.StopRecordingVisibleTab]: stopRecordingVisibleTab,
  }),
);
