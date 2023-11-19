import { MaterialCommunityIcons } from '@expo/vector-icons';

import { EmptyListIcon, EmptyListProps } from '../../@types';
import { theme } from '../../config';
import { Typography } from '../Typography';
import { Container } from './styles';

export function EmptyList(props: EmptyListProps) {
  const { message, variant } = props;

  const { colors, spacings } = theme;

  const icons: Record<EmptyListProps['variant'], EmptyListIcon> = {
    comments: 'comment-off-outline',
    posts: 'post',
  };

  return (
    <Container>
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
