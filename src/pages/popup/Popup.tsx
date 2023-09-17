import { useState } from 'react';

import Logo from '@assets/icon-128.png';
import { useActivePage } from '@hooks/useActivePage';
import { show } from '@store/toolbar';
import { Button } from '@components/Button';
import styles from './Popup.module.scss';

export const Popup = (): JSX.Element => {
  const activeTab = useActivePage();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const handlePictureClick = async () => {
    const dataUrl = await chrome.tabs.captureVisibleTab();
    setPreviewUrl(dataUrl);
  };

  const handleToolbarClick = () => {
    if (activeTab?.id) {
      show(activeTab.id);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={Logo} />
      Popup component
      <div className={styles.toolbar}>
        <Button onClick={handlePictureClick}>Take a picture</Button>
        <Button onClick={handleToolbarClick} disabled={!activeTab?.id}>
          Show toolbar
        </Button>
      </div>
      {previewUrl && (
        <div className={styles.preview}>
          <img src={previewUrl} />
        </div>
      )}
    </div>
  );
};
