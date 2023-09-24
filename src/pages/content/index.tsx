import { createRoot } from 'react-dom/client';

import { Content } from './Content';
import styles from './index.module.scss';

const id = Math.round(Math.random() * 1000000);

const init = () => {
  const rootContainer = document?.createElement('div');
  if (rootContainer) {
    rootContainer.id = `__root${id}`;
    rootContainer.classList.add(styles.root);
    document.body.appendChild(rootContainer);
    const root = createRoot(rootContainer);
    root.render(<Content />);
  }
};

init();
