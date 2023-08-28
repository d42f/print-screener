import { createRoot } from 'react-dom/client';

import { Content } from './Content';
import styles from './index.module.scss';

const init = () => {
  const rootContainer = document?.createElement('div');
  if (rootContainer) {
    rootContainer.id = '__root';
    rootContainer.classList.add(styles.root);
    document.body.appendChild(rootContainer);
    const root = createRoot(rootContainer);
    root.render(<Content />);
  }
};

init();
