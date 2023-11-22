import { RefreshControl } from 'react-native';

import { RefreshProps } from '../../@types';
import { theme } from '../../config';

export function Refresh(props: RefreshProps) {
  const { onRefresh, refreshing } = props;

  const { colors, spacings } = theme;

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={colors.primary}
      size={spacings[2]}
    />
  );
}
