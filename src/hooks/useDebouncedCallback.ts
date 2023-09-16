import { useCallback, useRef } from 'react';

export const useDebouncedCallback = <T extends (...args: Parameters<T>) => void>(func: T, wait = 0) => {
  const funcRef = useRef(func);
  const timeout = useRef<number>();

  return useCallback(
    (...args: Parameters<T>): void => {
      const later = () => {
        clearTimeout(timeout.current);
        funcRef.current(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait) as unknown as number;
    },
    [wait],
  ) as T;
};
