import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

export interface UserFrame {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Point {
  x: number;
  y: number;
}

type Resolver = (value: UserFrame) => void;

const getFrame = (point1: Point, point2: Point): UserFrame => {
  return {
    top: Math.min(point1.y, point2.y),
    right: Math.max(point1.x, point2.x),
    bottom: Math.max(point1.y, point2.y),
    left: Math.min(point1.x, point2.x),
  };
};

const getFrameStyles = (frame: UserFrame): CSSProperties => ({
  width: `${frame.right - frame.left}px`,
  height: `${frame.bottom - frame.top}px`,
  top: `${frame.top}px`,
  left: `${frame.left}px`,
});

const LOCKER_STYLES: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: '0px',
  left: '0px',
  zIndex: `${Number.MAX_SAFE_INTEGER - 1}`,
  userSelect: 'none',
};

const FRAME_STYLES: CSSProperties = {
  width: '0px',
  height: '0px',
  position: 'fixed',
  top: '0px',
  left: '0px',
  zIndex: `${Number.MAX_SAFE_INTEGER - 1}`,
  userSelect: 'none',
  pointerEvents: 'none',
  boxShadow: 'rgba(33, 33, 33, 0.8) 0px 0px 1px 2px',
};

const FRAME_BOX_STYLES: CSSProperties = {
  boxShadow: 'rgba(33, 33, 33, 0.8) 0px 0px 1px 2px, rgba(33, 33, 33, 0.5) 0px 0px 0px 5000px',
};

export const useUserFrame = () => {
  const [isCatching, setIsCatching] = useState(false);
  const [frameStyles, setFrameStyles] = useState<CSSProperties>();
  const startPointRef = useRef<Point | null>(null);
  const resolverRef = useRef<Resolver | null>(null);

  const handleStart = useCallback(
    (event: MouseEvent) => {
      if (isCatching) {
        startPointRef.current = { x: event.pageX, y: event.pageY };
        setFrameStyles(value => ({ ...value, top: `${event.pageY}px`, left: `${event.pageY}px` }));
      }
    },
    [isCatching],
  );

  const handleMove = useCallback((event: MouseEvent) => {
    if (startPointRef.current) {
      const frame = getFrame(startPointRef.current, { x: event.pageX, y: event.pageY });
      setFrameStyles(value => ({ ...value, ...getFrameStyles(frame) }));
    }
  }, []);

  const handleEnd = useCallback((event: MouseEvent) => {
    if (startPointRef.current) {
      setIsCatching(false);
      const frame = getFrame(startPointRef.current, { x: event.pageX, y: event.pageY });
      resolverRef.current?.(frame);
      resolverRef.current = null;
      startPointRef.current = null;
    }
  }, []);

  const start = useCallback((): Promise<UserFrame> => {
    setIsCatching(true);
    setFrameStyles({ ...FRAME_STYLES, ...FRAME_BOX_STYLES });

    return new Promise(resolver => {
      resolverRef.current = resolver;
    });
  }, []);

  const render = useCallback(
    (frame?: UserFrame) => (
      <>
        {isCatching && (
          <div style={LOCKER_STYLES}>
            <div style={frameStyles}></div>
          </div>
        )}
        {frame && <div style={{ ...FRAME_STYLES, ...getFrameStyles(frame) }}></div>}
      </>
    ),
    [isCatching, frameStyles],
  );

  useEffect(() => {
    if (isCatching) {
      window.addEventListener('pointerdown', handleStart);
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleEnd);

      return () => {
        window.removeEventListener('pointerdown', handleStart);
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleEnd);
      };
    }
  }, [isCatching, handleStart, handleMove, handleEnd]);

  return { start, render };
};
