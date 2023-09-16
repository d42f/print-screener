import { action, WritableAtom } from 'nanostores';
import { Toolbar, ToolbarPosition } from '@models/Toolbar';
import { persistentAtom } from './persistentStore';

const defaultValue: Toolbar = {
  visible: false,
  position: {
    x: 10,
    y: 10,
  },
};

export const $toolbar = persistentAtom<Toolbar>('toolbar', defaultValue);

export const setVisible = action($toolbar, 'setVisible', (store: WritableAtom<Toolbar>, visible: boolean) => {
  store.set({ ...store.get(), visible });
  return store.get();
});

export const toggle = action($toolbar, 'toggle', (store: WritableAtom<Toolbar>) => {
  const state = store.get();
  return setVisible(!state?.visible);
});

export const setPosition = action(
  $toolbar,
  'setPosition',
  (store: WritableAtom<Toolbar>, position: ToolbarPosition) => {
    store.set({ ...store.get(), position });
    return store.get();
  },
);
