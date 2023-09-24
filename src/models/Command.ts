export enum BackgroundCommand {
  GetTab = 'BackgroundGetTab',
  CaptureVisibleTab = 'BackgroundCaptureVisibleTab',
  GetMediaStreamId = 'BackgroundGetMediaStreamId',
  StartRecordingVisibleTab = 'BackgroundStartRecordingVisibleTab',
  StopRecordingVisibleTab = 'BackgroundStopRecordingVisibleTab',
}

export enum OffscreenCommand {
  StartRecording = 'OffscreenStartRecording',
  StopRecording = 'OffscreenStopRecording',
}

export type SendResponse<T> = (response: T) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandAction<M = any, R = any> = (
  message: M,
  sender: chrome.runtime.MessageSender,
  sendResponse: SendResponse<R>,
) => void;
