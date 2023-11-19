import * as VideoThumbnails from 'expo-video-thumbnails';
import { useEffect, useState } from 'react';
import { When } from 'react-if';

import { ThumbnailProps } from '../../@types';
import { Container, Image } from './styles';

export function Thumbnail(props: ThumbnailProps) {
  const { url, disabled = false, ...rest } = props;

  const [thumbnail, setThumbnail] = useState<string>('');

  async function generateThumbnail(): Promise<void> {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
        time: 1000,
        quality: 1,
      });
      setThumbnail(uri);
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    generateThumbnail();
  }, [url]);

  return (
    <Container activeOpacity={0.85} disabled={!thumbnail || disabled} {...rest}>
      <When condition={thumbnail}>
        <Image source={{ uri: thumbnail }} resizeMode='cover' />
      </When>
    </Container>
  );
}
