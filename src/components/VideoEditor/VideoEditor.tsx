import { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';

import { CloseButton } from '@components/CloseButton';
import styles from './VideoEditor.module.scss';
import { EditorToolbar } from './EditorToolbar';

interface VideoEditorProps {
  className?: string;
  blob: Blob;
  onClose: () => void;
}

export const VideoEditor = ({ className, blob, onClose }: VideoEditorProps): JSX.Element => {
  const saveLink = useRef<HTMLAnchorElement>(null);

  const objectUrl = useMemo(() => (blob ? URL.createObjectURL(blob) : null), [blob]);
  const fileName = useMemo(
    () => `${document.title} (${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()})`,
    [],
  );

  const handleSave = () => {
    saveLink.current?.click();
  };

  useEffect(() => {
    return () => {
      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <CloseButton className={styles.closeButton} onClick={onClose} />
      <div className={styles.content}>
        {objectUrl ? (
          <>
            <video className={styles.video} src={objectUrl} controls={false} />
            <EditorToolbar onSave={handleSave} />
            <a className={styles.hiddenLink} ref={saveLink} href={objectUrl} download={fileName}></a>
          </>
        ) : (
          <span className={styles.emptyHint}>No blob</span>
        )}
      </div>
    </div>
  );
};
