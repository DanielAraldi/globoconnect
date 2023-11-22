import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Share } from 'react-native';
import Toast from 'react-native-toast-message';

import { PostTemplateProps, StackNavigate } from '../../@types';
import { theme } from '../../config';
import { usePosts } from '../../hooks';
import { AuthService } from '../../services';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import { Video } from '../Video';
import { BarContent, BarWrapper, Container, VideoWrapper } from './styles';

export function PostTemplate(props: PostTemplateProps) {
  const {
    avatarUrl,
    name,
    uri,
    nickname,
    isPaused = false,
    variant = 'feed',
  } = props;

  const navigation = useNavigation<StackNavigate>();
  const { loadPostByUserId } = usePosts();

  const { colors, spacings } = theme;

  function showToast(title: string, message: string): void {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  }

  async function handleShare(): Promise<void> {
    const message = `Ei, da uma olhada nesse vídeo! Acesso em: ${uri}`;

    await Share.share({
      message,
      url: uri,
      title: 'Venha fazer parte do GloboConnect!',
    });
  }

  async function goToProfile(): Promise<void> {
    if (nickname) {
      const response = await AuthService.loadByNickname(nickname);
      if (response) {
        await loadPostByUserId(response.id);
        navigation.navigate('Profile', response);
      } else {
        showToast(
          'Ei connector!',
          'Certifique-se que você está com uma conexão de internet estável e tente novamente.',
        );
      }
    }
  }

  return (
    <Container>
      <BarContent variant={variant}>
        <BarWrapper>
          <Avatar variant='post' avatarUrl={avatarUrl} onPress={goToProfile} />

          <Typography
            text={name}
            fontSize='medium'
            color={colors.light.main}
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode='tail'
            isCapitalized
            onPress={goToProfile}
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
