import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { PublishProps } from '../../../../@types';
import { Comment, PostTemplate } from '../../../../components';
import { theme } from '../../../../config';
import { useAuth, usePosts } from '../../../../hooks';
import { PostService } from '../../../../services';
import { Container, InteractionBar } from './styles';

export function Publish(props: PublishProps) {
  const {
    avatarUrl,
    name,
    uri,
    isPaused,
    likes,
    postId,
    description,
    nickname,
    title,
    onPress,
  } = props;

  const { loadAllPosts } = usePosts();
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { colors, spacings } = theme;

  const isLikedPost = likes.find(id => user.id === id);
  const videoIsPaused = !isFocused || isPaused;
  const commonIconProps = {
    color: colors.light.main,
    size: spacings[7],
  };

  function showToast(title: string, message: string): void {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  }

  function handleToastMessage(): void {
    showToast(
      'Ops!',
      'Certifique-se que você está com um conexão estável de internet e tente novamente',
    );
  }

  async function giveLike(): Promise<void> {
    const isLiked = await PostService.like(postId, user.id);
    if (!isLiked) handleToastMessage();
  }

  async function giveDeslike(): Promise<void> {
    const isDesliked = await PostService.deslike(postId, user.id);
    if (!isDesliked) handleToastMessage();
  }

  async function handleSatisfaction(): Promise<void> {
    setIsLoading(true);

    if (isLikedPost) await giveDeslike();
    else await giveLike();

    await loadAllPosts();
    setIsLoading(false);
  }

  return (
    <Container>
      <PostTemplate
        nickname={nickname}
        avatarUrl={avatarUrl}
        name={name}
        uri={uri}
        isPaused={videoIsPaused}
        variant='feed'
      />

      <InteractionBar>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          disabled={isLoading}
        >
          <MaterialCommunityIcons
            name='comment-text-outline'
            {...commonIconProps}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSatisfaction}
          disabled={isLoading}
        >
          <If condition={isLikedPost}>
            <Then>
              <MaterialCommunityIcons
                name='heart'
                {...commonIconProps}
                color={colors.primary}
              />
            </Then>
            <Else>
              <Feather name='heart' {...commonIconProps} />
            </Else>
          </If>
        </TouchableOpacity>
      </InteractionBar>

      <Comment comment={description} nickname={nickname} title={title} />
    </Container>
  );
}
