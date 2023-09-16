import { useEffect, useState } from 'react';

export const useActivePage = (): chrome.tabs.Tab | null => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab | null>(null);

  useEffect(() => {
    let mounted = true;
    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(tabs => {
      if (mounted && tabs.length > 0) {
        setActiveTab(tabs[0]);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return activeTab;
};
