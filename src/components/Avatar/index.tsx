import { AvatarProps } from '../../@types';
import { Container, Photo } from './styles';

export function Avatar({ variant }: AvatarProps) {
  return (
    <Container variant={variant}>
      <Photo
        source={{ uri: 'https://avatars.githubusercontent.com/u/2254731?v=4' }}
        resizeMode='contain'
      />
    </Container>
  );
}
