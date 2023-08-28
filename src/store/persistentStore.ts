import { atom, keepMount, onMount } from 'nanostores';
import { Storage, storage } from 'webextension-polyfill';

interface Options {
  listen?: boolean;
}

export const persistentAtom = <T>(
  name: string,
  initial: T,
  opts: Options = {},
): ReturnType<typeof atom<T | undefined>> => {
  const store = atom<T | undefined>(initial);

  const set = store.set;
  store.set = (newValue: T | undefined): ReturnType<typeof set> => {
    set(newValue);
    if (typeof newValue === 'undefined') {
      storage.local.remove(name);
    } else {
      storage.local.set({ [name]: newValue });
    }
  };

  const storageListener = ({ [name]: { newValue } }: Record<string, Storage.StorageChange>): void => {
    store.set(newValue);
  };

  async function restore() {
    const { [name]: value } = await storage.local.get(name);
    store.set(value || initial);
  }

  onMount(store, () => {
    restore();
    if (opts.listen !== false) {
      storage.onChanged.addListener(storageListener);
      return () => {
        storage.onChanged.removeListener(storageListener);
      };
    }
  });

  keepMount(store);
  return store;
};
