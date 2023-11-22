import { AvatarProps } from '../../@types';
import { USER } from '../../config';
import { Container, Photo } from './styles';

export function Avatar(props: AvatarProps) {
  const { avatarUrl, ...rest } = props;

  const source = avatarUrl ? { uri: avatarUrl } : USER;

  return (
    <Container {...rest}>
      <Photo source={source} resizeMode='contain' />
    </Container>
  );
}
