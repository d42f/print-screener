import { RefObject, useMemo, useRef, useState } from 'react';

interface Options {
  onEnd?: () => void;
}

export const useDraggable = (elementRef: RefObject<HTMLElement>, opts: Options = {}) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const state = useRef({ isDragging: false, isStarted: false, startX: 0, startY: 0 });
  const onEndRef = useRef(opts.onEnd);

  const listeners = useMemo(
    () => ({
      onPointerDown: (event: PointerEvent) => {
        event.stopPropagation();
        event.preventDefault();
        state.current.isDragging = true;
        state.current.startX = (elementRef.current?.offsetLeft ?? 0) - event.clientX;
        state.current.startY = (elementRef.current?.offsetTop ?? 0) - event.clientY;
        console.log(event);
      },
      onPointerMove: (event: PointerEvent) => {
        if (state.current.isDragging) {
          state.current.isStarted = true;
          setTransform({ x: event.clientX + state.current.startX, y: event.clientY + state.current.startY });
        }
      },
      onPointerUp: (event: PointerEvent) => {
        if (onEndRef.current && state.current.isStarted) {
          onEndRef.current();
        }
        setTransform({ x: event.clientX + state.current.startX, y: event.clientY + state.current.startY });
        state.current.isDragging = false;
        state.current.isStarted = false;
        state.current.startX = 0;
        state.current.startY = 0;
      },
    }),
    [elementRef],
  );

  return {
    listeners,
    transform,
    isDragging: state.current.isDragging,
  };
};
