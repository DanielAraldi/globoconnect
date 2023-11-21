import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native';

import { PublishProps } from '../../../../@types';
import { PostTemplate, Typography } from '../../../../components';
import { theme } from '../../../../config';
import { usePosts } from '../../../../hooks';
import { PostService } from '../../../../services';
import { Container, InteractionBar, PostMessageWrapper } from './styles';

export function Publish(props: PublishProps) {
  const {
    avatarUrl,
    name,
    uri,
    isPaused,
    liked,
    likes,
    postId,
    description,
    nickname,
    title,
    onPress,
  } = props;

  const { loadAllPosts } = usePosts();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { colors, spacings } = theme;

  const videoIsPaused = !isFocused || isPaused;
  const commonIconProps = {
    color: colors.light.main,
    size: spacings[5],
  };

  async function giveLike(): Promise<boolean> {
    return await PostService.like(postId, likes);
  }

  async function giveDeslike(): Promise<boolean> {
    return await PostService.deslike(postId, likes);
  }

  async function handleSatisfaction(): Promise<void> {
    setIsLoading(true);

    if (liked) await giveDeslike();
    else await giveLike();

    await loadAllPosts();
    setIsLoading(false);
  }

  const renderPostMessage: JSX.Element = (
    <PostMessageWrapper>
      <Typography
        variant='nunitoSemiBold'
        text={`@${nickname}: ${title}`}
        fontSize='medium'
      />

      <Typography
        variant='nunitoRegular'
        text={description}
        fontSize='medium'
      />
    </PostMessageWrapper>
  );

  return (
    <Container>
      <PostTemplate
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
          <If condition={liked}>
            <Then>
              <MaterialCommunityIcons
                name='heart'
                size={spacings[5]}
                color={colors.primary}
              />
            </Then>
            <Else>
              <Feather name='heart' {...commonIconProps} />
            </Else>
          </If>
        </TouchableOpacity>
      </InteractionBar>

      {renderPostMessage}
    </Container>
  );
}
