export type Key = 'user';

export interface StorageProps {
  get<T = string>(key: Key): Promise<T | null>;
  set<T = string>(key: Key, value: T): Promise<void>;
  clear(): Promise<void>;
}
