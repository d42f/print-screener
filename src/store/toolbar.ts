import { action, WritableAtom } from 'nanostores';
import { Toolbar, ToolbarPosition } from '@models/Toolbar';
import { persistentAtom } from './persistentStore';

const defaultValue: Toolbar = {
  tabId: null,
  position: {
    x: 10,
    y: 10,
  },
};

export const $toolbar = persistentAtom<Toolbar>('toolbar', defaultValue);

export const show = action($toolbar, 'show', (store: WritableAtom<Toolbar>, tabId: number) => {
  store.set({ ...store.get(), tabId });
  return store.get();
});

export const hide = action($toolbar, 'hide', (store: WritableAtom<Toolbar>) => {
  store.set({ ...store.get(), tabId: null });
  return store.get();
});

export const setPosition = action(
  $toolbar,
  'setPosition',
  (store: WritableAtom<Toolbar>, position: ToolbarPosition) => {
    store.set({ ...store.get(), position });
    return store.get();
  },
);
