import { CSSProperties, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { BackgroundCommand } from '@models/Command';
import { callCommand } from '@utils/command';
import { $toolbar, hide, setPosition } from '@store/toolbar';
import { useCurrentTab } from '@hooks/useCurrentTab';
import { Toolbar } from '@components/Toolbar';
import styles from './Content.module.scss';
import { base64ToBlob } from '@utils/file';

const MODIFIERS = [restrictToWindowEdges];

export const Content = (): JSX.Element => {
  const currentTab = useCurrentTab();
  const { tabId, position } = useStore($toolbar);

  const baseStyle = useMemo<CSSProperties>(() => ({ left: `${position.x}px`, top: `${position.y}px` }), [position]);

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    setPosition({ x: position.x + delta.x, y: position.y + delta.y });
  };

  const handleStart = async () => {
    const { base64Blob } = await callCommand<{ base64Blob: string }>(BackgroundCommand.StartRecordingVisibleTab);
    const blob = await base64ToBlob(base64Blob);
    window.open(URL.createObjectURL(blob), '_blank');
  };

  const handleStop = () => {
    callCommand(BackgroundCommand.StopRecordingVisibleTab);
  };

  return (
    <DndContext modifiers={MODIFIERS} onDragEnd={handleDragEnd}>
      {!!tabId && tabId === currentTab?.id && (
        <div className={styles.wrapper}>
          <Toolbar baseStyle={baseStyle} onStart={handleStart} onStop={handleStop} onClose={hide} />
        </div>
      )}
    </DndContext>
  );
};
