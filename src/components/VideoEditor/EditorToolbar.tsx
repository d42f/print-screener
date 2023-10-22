import classNames from 'classnames';

import { Button } from '@components/Button';
import styles from './EditorToolbar.module.scss';

interface EditorToolbarProps {
  className?: string;
  onSave: () => void;
}

export const EditorToolbar = ({ className, onSave }: EditorToolbarProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    <Button size="small" onClick={onSave}>
      Save
    </Button>
  </div>
);
