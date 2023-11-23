import { ViewToken } from 'react-native';

export type GetItemLayoutType = 'publish' | 'comment';

export interface GetItemLayoutProps {
  length: number;
  offset: number;
  index: number;
}

export interface ViewableItemsProps {
  changed: ViewToken[];
}
