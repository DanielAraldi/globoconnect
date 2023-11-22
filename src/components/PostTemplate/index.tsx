import { Feather } from '@expo/vector-icons';
import { Pressable, Share } from 'react-native';

import { PostTemplateProps } from '../../@types';
import { theme } from '../../config';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import { Video } from '../Video';
import { BarContent, BarWrapper, Container, VideoWrapper } from './styles';

export function PostTemplate(props: PostTemplateProps) {
  const { avatarUrl, name, uri, isPaused = false, variant = 'feed' } = props;

  const { colors, spacings } = theme;

  async function handleShare(): Promise<void> {
    const message = `Ei, da uma olhada nesse vídeo! Acesso em: ${uri}`;

    await Share.share({
      message,
      url: uri,
      title: 'Venha fazer parte do GloboConnect!',
    });
  }

  return (
    <Container>
      <BarContent variant={variant}>
        <BarWrapper>
          <Avatar variant='post' avatarUrl={avatarUrl} />

          <Typography
            text={name}
            fontSize='medium'
            color={colors.light.main}
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode='tail'
            isCapitalized
          />
        </BarWrapper>

        <Pressable onPress={handleShare}>
          <Feather
            name='share-2'
            color={colors.light.main}
            size={spacings[4]}
          />
        </Pressable>
      </BarContent>

      <VideoWrapper variant={variant}>
        <Video uri={uri} isPaused={isPaused} />
      </VideoWrapper>
    </Container>
  );
}
