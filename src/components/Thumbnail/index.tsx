import { ThumbnailProps } from '../../@types';
import { Container, Image } from './styles';

export function Thumbnail(props: ThumbnailProps) {
  const { uri, ...rest } = props;

  return (
    <Container activeOpacity={0.85} {...rest}>
      <Image source={{ uri }} resizeMode='cover' />
    </Container>
  );
}
