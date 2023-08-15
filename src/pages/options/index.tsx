import { createRoot } from 'react-dom/client';

import { Options } from './Options';
import styles from './index.module.css';

const init = () => {
  const rootContainer = document.querySelector('#__root');
  if (rootContainer) {
    rootContainer.classList.add(styles.root);
    const root = createRoot(rootContainer);
    root.render(<Options />);
  }
};

init();
