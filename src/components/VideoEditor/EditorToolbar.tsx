import classNames from 'classnames';

import { Button } from '@components/Button';
import styles from './EditorToolbar.module.scss';

interface EditorToolbarProps {
  className?: string;
  onRect: () => void;
  onSave: () => void;
}

export const EditorToolbar = ({ className, onRect, onSave }: EditorToolbarProps): JSX.Element => (
  <div className={classNames(styles.wrapper, className)}>
    <Button size="small" onClick={onRect}>
      Rect
    </Button>
    <Button size="small" onClick={onSave}>
      Save
    </Button>
  </div>
);
