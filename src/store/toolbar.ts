import { action, WritableAtom } from 'nanostores';
import { Toolbar } from '@src/models/Toolbar';
import { persistentAtom } from './persistentStore';

export const $toolbar = persistentAtom<Toolbar>('toolbar', {
  visible: false,
});

export const setVisible = action($toolbar, 'setVisible', (store: WritableAtom<Toolbar | undefined>, value: boolean) => {
  store.set({
    ...store.get(),
    visible: value,
  });
  return store.get();
});

export const toggle = action($toolbar, 'toggle', (store: WritableAtom<Toolbar | undefined>) => {
  const state = store.get();
  return setVisible(!state?.visible);
});
