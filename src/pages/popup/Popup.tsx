import { useState } from 'react';

import Logo from '@assets/icon-128.png';
import { useCurrentTab } from '@hooks/useCurrentTab';
import { show } from '@store/toolbar';
import { Button } from '@components/Button';
import styles from './Popup.module.scss';

export const Popup = (): JSX.Element => {
  const currentTab = useCurrentTab();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const handlePictureClick = async () => {
    const dataUrl = await chrome.tabs.captureVisibleTab();
    setPreviewUrl(dataUrl);
  };

  const handleToolbarClick = () => {
    if (currentTab?.id) {
      show(currentTab.id);
      //window.close();
    }
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={Logo} />
      Popup component
      <div className={styles.toolbar}>
        <Button onClick={handlePictureClick}>Take a picture</Button>
        <Button onClick={handleToolbarClick} disabled={!currentTab?.id}>
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
