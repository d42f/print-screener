import { useCallback } from 'react';
import { BackgroundCommand } from '@models/BackgroundCommand';

interface UseBackgroundCommand {
  send: <T>(command: BackgroundCommand) => Promise<T>;
}

export const useBackgroundCommand = (): UseBackgroundCommand => ({
  send: useCallback(<T>(command: BackgroundCommand) => {
    return new Promise<T>(resolve => {
      chrome.runtime.sendMessage({ command }, (response: T) => {
        resolve(response);
      });
    });
  }, []),
});
