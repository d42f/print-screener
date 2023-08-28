import { useEffect } from 'react';

import Logo from '@assets/react.svg';
import { Button } from '@components/Button';
import { setVisible } from '@store/toolbar';
import styles from './Popup.module.scss';

export const Popup = (): JSX.Element => {
  const handleVisibleClick = () => {
    setVisible(true);
    window.close();
  };

  useEffect(() => {
    setVisible(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Logo />
      Popup component
      <Button onClick={handleVisibleClick}>Show toolbar</Button>
    </div>
  );
};
