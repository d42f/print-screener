import { createRoot } from 'react-dom/client';

import { Popup } from './Popup';
import styles from './index.module.scss';

const init = () => {
  const rootContainer = document.querySelector('#__root');
  if (rootContainer) {
    rootContainer.classList.add(styles.root);
    const root = createRoot(rootContainer);
    root.render(<Popup />);
  }
};

init();
