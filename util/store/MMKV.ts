import { MMKV } from 'react-native-mmkv';

import { StateStorage } from 'zustand/middleware';

const storage = new MMKV({
  id: '@iforth-filter',
});

export const zustandStorage: StateStorage = {
  getItem: (name) => {
    const value = storage.getString(name);
    // console.log(value);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
  setItem: (name, value) => {
    return storage.set(name, value);
  },
};
