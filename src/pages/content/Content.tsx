import { CSSProperties, useMemo, useState } from 'react';
import { useStore } from '@nanostores/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { BackgroundCommand } from '@models/Command';
import { callCommand } from '@utils/command';
import { base64ToBlob } from '@utils/file';
import { $toolbar, hide, setPosition } from '@store/toolbar';
import { useCurrentTab } from '@hooks/useCurrentTab';
import { useSwitch } from '@hooks/useSwitch';
import { Toolbar } from '@components/Toolbar';
import { VideoEditor } from '@components/VideoEditor';
import styles from './Content.module.scss';

const MODIFIERS = [restrictToWindowEdges];

export const Content = (): JSX.Element => {
  const currentTab = useCurrentTab();
  const { tabId, position } = useStore($toolbar);
  const { value: isEditorOpened, on: openEditor, off: closeEditor } = useSwitch();
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const baseStyle = useMemo<CSSProperties>(() => ({ left: `${position.x}px`, top: `${position.y}px` }), [position]);

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    setPosition({ x: position.x + delta.x, y: position.y + delta.y });
  };

  const handleStart = async () => {
    const { base64Blob } = await callCommand<{ base64Blob: string }>(BackgroundCommand.StartRecordingVisibleTab);
    const blob = await base64ToBlob(base64Blob);
    setVideoBlob(blob);
    openEditor();
  };

  const handleStop = () => {
    callCommand(BackgroundCommand.StopRecordingVisibleTab);
  };

  const handleEditorClose = () => {
    setVideoBlob(null);
    closeEditor();
  };

  return (
    <DndContext modifiers={MODIFIERS} onDragEnd={handleDragEnd}>
      {!!tabId && tabId === currentTab?.id && (
        <div className={styles.wrapper}>
          <Toolbar baseStyle={baseStyle} onStart={handleStart} onStop={handleStop} onClose={hide} />
          {isEditorOpened && videoBlob && <VideoEditor blob={videoBlob} onClose={handleEditorClose} />}
        </div>
      )}
    </DndContext>
  );
};
