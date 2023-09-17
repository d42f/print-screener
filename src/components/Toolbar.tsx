import classNames from 'classnames';
import { CSSProperties, useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FaGripVertical, FaTimes } from 'react-icons/fa';

import Logo from '@assets/react.svg';
import { Button } from '@components/Button';
import styles from './Toolbar.module.scss';

interface ToolbarProps {
  className?: string;
  baseStyle?: CSSProperties;
  onClose: () => void;
}

export const Toolbar = ({ className, baseStyle, onClose }: ToolbarProps): JSX.Element => {
  const { isDragging, listeners, setNodeRef, transform } = useDraggable({ id: 'toolbar' });

  const style: CSSProperties = useMemo<CSSProperties>(
    () => ({
      ...baseStyle,
      transform: transform ? CSS.Transform.toString(transform) : undefined,
    }),
    [baseStyle, transform],
  );

  const handleStart = () => {
    //
  };

  return (
    <div
      className={classNames(styles.wrapper, className, { [styles.dragIconDragging]: isDragging })}
      ref={setNodeRef}
      style={style}
    >
      <FaGripVertical
        className={classNames(styles.dragIcon, { [styles.dragIconDragging]: isDragging })}
        {...listeners}
      />
      <Logo />
      <Button size="small" onClick={handleStart}>
        Start
      </Button>
      <Button size="small" rect={true} onClick={onClose}>
        <FaTimes />
      </Button>
    </div>
  );
};
