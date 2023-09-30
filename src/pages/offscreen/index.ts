import { CommandAction, OffscreenCommand } from '@models/Command';
import { blobToBase64 } from '@utils/file';
import { getMessageListener } from '@utils/message';

// TODO: stop recording by timeout

let recorder: MediaRecorder | null = null;
let data: BlobPart[] = [];

const startRecording: CommandAction<{ streamId: string }, { base64Blob: string }> = async ({
  message: { streamId },
  sendResponse,
}) => {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId,
      },
    } as MediaTrackConstraints,
    video: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId,
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

const stopRecording: CommandAction<void, { status: string }> = async ({ sendResponse }) => {
  recorder?.stop();
  recorder?.stream.getTracks().forEach(track => track.stop());
  sendResponse({ status: 'stop recording' });
};

chrome.runtime.onMessage.addListener(
  getMessageListener<OffscreenCommand>({
    [OffscreenCommand.StartRecording]: startRecording,
    [OffscreenCommand.StopRecording]: stopRecording,
  }),
);
