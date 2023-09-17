import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useStore } from '@nanostores/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { $toolbar, hide, setPosition } from '@store/toolbar';
import { Toolbar } from '@components/Toolbar';
import { useBackgroundCommand } from '@hooks/useBackgroundCommand';
import { BackgroundCommand } from '@models/BackgroundCommand';

const MODIFIERS = [restrictToWindowEdges];

export const Content = (): JSX.Element | null => {
  const { tabId, position } = useStore($toolbar);
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>();
  const { call } = useBackgroundCommand();

  const baseStyle = useMemo<CSSProperties>(() => ({ left: `${position.x}px`, top: `${position.y}px` }), [position]);

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    setPosition({ x: position.x + delta.x, y: position.y + delta.y });
  };

  useEffect(() => {
    call<{ tab: typeof currentTab }>(BackgroundCommand.GetTab).then(({ tab }) => {
      setCurrentTab(tab);
    });
  }, [call]);

  return (
    <DndContext modifiers={MODIFIERS} onDragEnd={handleDragEnd}>
      {tabId && tabId === currentTab?.id ? <Toolbar baseStyle={baseStyle} onClose={hide} /> : null}
    </DndContext>
  );
};
