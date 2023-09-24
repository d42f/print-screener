import { CommandAction, OffscreenCommand } from '@models/Command';
import { blobToBase64 } from '@utils/file';

// TODO: stop recording by timeout

let recorder: MediaRecorder | null = null;
let data: BlobPart[] = [];

const startRecording: CommandAction<{ streamId: string }, { base64Blob: string }> = async (
  message,
  _sender,
  sendResponse,
) => {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: message.streamId,
      },
    } as MediaTrackConstraints,
    video: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: message.streamId,
      },
    } as MediaTrackConstraints,
  });

  const output = new AudioContext();
  const source = output.createMediaStreamSource(media);
  source.connect(output.destination);

  recorder = new MediaRecorder(media, { mimeType: 'video/webm' });
  recorder.ondataavailable = (event: BlobEvent) => {
    data.push(event.data);
  };
  recorder.onstop = async () => {
    const blob = new Blob(data, { type: 'video/webm' });
    const base64Blob = await blobToBase64(blob);
    sendResponse({ base64Blob });
    recorder = null;
    data = [];
  };
  recorder.start();
};

const stopRecording: CommandAction<unknown, { status: string }> = async (_message, _sender, sendResponse) => {
  recorder?.stop();
  recorder?.stream.getTracks().forEach(track => track.stop());
  sendResponse({ status: 'stop recording' });
};

const commandActions: Record<OffscreenCommand, CommandAction> = {
  [OffscreenCommand.StartRecording]: startRecording,
  [OffscreenCommand.StopRecording]: stopRecording,
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  commandActions[message.command as OffscreenCommand]?.(message, sender, sendResponse);
  return true;
});
