import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';

import {
  EmptyMessageIcon,
  EmptyMessageProps,
  EmptyMessageVariant,
} from '../../@types';
import { theme } from '../../config';
import { Typography } from '../Typography';
import { Container } from './styles';

export function EmptyMessage(props: EmptyMessageProps) {
  const { message, variant } = props;

  const { colors, spacings } = theme;

  const icons: Record<EmptyMessageVariant, EmptyMessageIcon> = {
    comments: 'comment-off-outline',
    posts: 'post',
    camera: 'camera-off-outline',
  };

  async function goToSettings(): Promise<void> {
    if (variant === 'camera') await Linking.openSettings();
  }

  return (
    <Container onPress={goToSettings}>
      <MaterialCommunityIcons
        name={icons[variant]}
        color={colors.light.main}
        size={spacings[10]}
      />

      <Typography
        text={message}
        fontSize='medium'
        color={colors.light.main}
        textAlign='center'
      />
    </Container>
  );
}
