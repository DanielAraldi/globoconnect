import AsyncStorage from '@react-native-async-storage/async-storage';

import { Key, StorageProps } from '../@types';

const STORAGE_NAME = '@globoconnect';

export const Storage: StorageProps = {
  async clear(): Promise<void> {
    await AsyncStorage.clear();
  },

  async get<T = string>(key: Key): Promise<T | null> {
    const data = await AsyncStorage.getItem(`${STORAGE_NAME}:${key}`);
    if (data) return JSON.parse(data) as T;
    else return null;
  },

  async set<T = string>(key: Key, value: T): Promise<void> {
    await AsyncStorage.setItem(`${STORAGE_NAME}:${key}`, JSON.stringify(value));
  },
};
