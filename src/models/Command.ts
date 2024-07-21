/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type SendResponse<T> = (response: T | { error?: any }) => void;

export type CommandAction<M = any, R = any> = (arg: {
  message: M;
  sender: chrome.runtime.MessageSender;
  sendResponse: SendResponse<R>;
}) => void;
