import { useStore } from '@nanostores/react';
import { FaTimes } from 'react-icons/fa';

import Logo from '@assets/react.svg';
import { $toolbar, setVisible } from '@store/toolbar';
import { Button } from '@src/components/Button';
import styles from './Content.module.scss';

export const Content = (): JSX.Element | null => {
  const toolbar = useStore($toolbar);

  return toolbar?.visible ? (
    <div className={`${styles.wrapper}`}>
      <Logo />
      <Button onClick={() => setVisible(false)}>Start</Button>
      <Button rect={true} onClick={() => setVisible(false)}>
        <FaTimes />
      </Button>
    </div>
  ) : null;
};
