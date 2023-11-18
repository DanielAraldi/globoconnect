import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { theme } from '../../config';

export function Load(props: ActivityIndicatorProps) {
  const { colors, spacings } = theme;

  const { size = spacings[5], color = colors.light.main } = props;

  return <ActivityIndicator size={size} color={color} />;
}
