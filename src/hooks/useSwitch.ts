import { useCallback, useState } from 'react';

export const useSwitch = (
  initialValue = false,
): { value: boolean; on: () => void; off: () => void; toggle: () => void } => {
  const [value, setValue] = useState(initialValue);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(prevValue => !prevValue), []);

  return { value, on, off, toggle };
};
