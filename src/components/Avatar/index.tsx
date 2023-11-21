import { AvatarProps } from '../../@types';
import { USER } from '../../config';
import { Container, Photo } from './styles';

export function Avatar(props: AvatarProps) {
  const { variant, avatarUrl } = props;

  const source = avatarUrl ? { uri: avatarUrl } : USER;

  return (
    <Container variant={variant}>
      <Photo source={source} resizeMode='contain' />
    </Container>
  );
}
