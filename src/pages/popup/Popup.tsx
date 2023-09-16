import { useEffect } from 'react';

import Logo from '@assets/react.svg';
import { useActivePage } from '@hooks/useActivePage';
import { show, hide } from '@store/toolbar';
import { Button } from '@components/Button';

import styles from './Popup.module.scss';

export const Popup = (): JSX.Element => {
  const activeTab = useActivePage();

  const handleVisibleClick = () => {
    if (activeTab?.id) {
      show(activeTab.id);
    }
    window.close();
  };

  useEffect(() => {
    hide();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Logo />
      Popup component
      <Button onClick={handleVisibleClick} disabled={!activeTab?.id}>
        Show toolbar
      </Button>
    </div>
  );
};
