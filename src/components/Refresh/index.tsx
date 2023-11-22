import { RefreshControl } from 'react-native';

import { RefreshProps } from '../../@types';
import { theme } from '../../config';

export function Refresh({ onRefresh }: RefreshProps) {
  const { colors, spacings } = theme;

  return (
    <RefreshControl
      refreshing={false}
      onRefresh={onRefresh}
      tintColor={colors.primary}
      size={spacings[2]}
    />
  );
}
