import { forwardRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import { Button, ButtonProps } from '@components/Button';
import styles from './CloseButton.module.scss';

export const CloseButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'children'>>(function CloseButton(
  props,
  ref,
) {
  return (
    <Button {...props} role="button" ref={ref}>
      <FaTimes className={styles.icon} />
    </Button>
  );
});
