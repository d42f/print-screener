import { useStore } from '@nanostores/react';
import { CSSProperties, useMemo } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { $toolbar, setVisible, setPosition } from '@store/toolbar';
import { Toolbar } from '@components/Toolbar';

const MODIFIERS = [restrictToWindowEdges];

export const Content = (): JSX.Element | null => {
  const toolbar = useStore($toolbar);

  const baseStyle = useMemo<CSSProperties>(
    () => ({ left: `${toolbar.position.x}px`, top: `${toolbar.position.y}px` }),
    [toolbar.position],
  );

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    setPosition({ x: toolbar.position.x + delta.x, y: toolbar.position.y + delta.y });
  };

  return (
    <DndContext modifiers={MODIFIERS} onDragEnd={handleDragEnd}>
      {toolbar.visible ? <Toolbar baseStyle={baseStyle} onClose={() => setVisible(false)} /> : null}
    </DndContext>
  );
};
