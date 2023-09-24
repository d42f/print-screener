import { useEffect, useState } from 'react';

import { BackgroundCommand } from '@models/Command';
import { callCommand } from '@utils/command';

export const useCurrentTab = (): chrome.tabs.Tab | null => {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);

  useEffect(() => {
    let mounted = true;
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(tabs => {
        if (mounted && tabs.length > 0) {
          setCurrentTab(tabs[0]);
        }
      });
    } else {
      callCommand<{ tab: typeof currentTab }>(BackgroundCommand.GetTab).then(({ tab }) => {
        setCurrentTab(tab);
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  return currentTab;
};
