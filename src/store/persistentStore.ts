import { atom, keepMount, onMount } from 'nanostores';
import { Storage, storage } from 'webextension-polyfill';

interface Options {
  listen?: boolean;
}

export const persistentAtom = <T>(name: string, initial: T, opts: Options = {}): ReturnType<typeof atom<T>> => {
  const store = atom<T>(initial);

  const set = store.set;
  store.set = (newValue: T): ReturnType<typeof set> => {
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

  const restore = async () => {
    const { [name]: value } = await storage.local.get(name);
    // TODO: check value if valid
    store.set(value || initial);
  };

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
