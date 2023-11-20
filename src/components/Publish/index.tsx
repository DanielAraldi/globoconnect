import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ResizeMode } from 'expo-av';
import { useMemo } from 'react';
import { Else, If, Then, When } from 'react-if';
import { Share, TouchableOpacity } from 'react-native';

import { PublishProps } from '../../@types';
import { theme } from '../../config';
import { Avatar } from '../Avatar';
import { EmptyMessage } from '../EmptyMessage';
import { Typography } from '../Typography';
import { UserComment } from '../UserComment';
import {
  Container,
  DescriptionWrapper,
  PostBar,
  PostVideo,
  PostVideoWrapper,
  UserBar,
  Username,
} from './styles';

export function Publish(props: PublishProps) {
  const {
    name,
    liked,
    comments,
    description,
    nickname,
    url,
    variant = 'feed',
  } = props;

  const { colors, spacings } = theme;

  const isFeed = variant === 'feed';
  const commonIconProps = {
    color: colors.light.main,
    size: spacings[5],
  };

  async function handleShare(): Promise<void> {
    const message = `Ei, da uma olhada nesse vídeo! Acesso em: ${url}`;

    Share.share({
      message,
      url,
      title: 'Venha fazer parte do GloboConnect!',
    });
  }

  const renderComments = useMemo(
    () =>
      comments.map(item => (
        <UserComment
          key={item.id}
          comment={item.comment}
          nickname={item.user.nickname}
        />
      )),
    [],
  );

  return (
    <Container
      contentContainerStyle={{ paddingBottom: isFeed ? 0 : spacings[9] }}
    >
      <UserBar>
        <Username>
          <Avatar variant='post' />

          <Typography
            text={name}
            fontSize='medium'
            color={colors.light.main}
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode='tail'
            isCapitalized
          />
        </Username>

        <TouchableOpacity activeOpacity={0.85} onPress={handleShare}>
          <Feather
            name='share-2'
            color={colors.light.main}
            size={spacings[4]}
          />
        </TouchableOpacity>
      </UserBar>

      <PostVideoWrapper variant={variant}>
        <PostVideo
          source={{ uri: url }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          volume={1}
        />
      </PostVideoWrapper>

      <When condition={!isFeed}>
        <DescriptionWrapper>
          <Typography
            variant='nunitoSemiBold'
            text={`@${nickname}: ${description}`}
            fontSize={'medium'}
          />
        </DescriptionWrapper>
      </When>

      <If condition={isFeed}>
        <Then>
          <PostBar>
            <TouchableOpacity activeOpacity={0.85} onPress={handleShare}>
              <MaterialCommunityIcons
                name='comment-text-outline'
                {...commonIconProps}
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} onPress={handleShare}>
              <If condition={liked}>
                <Then>
                  <MaterialCommunityIcons name='heart' {...commonIconProps} />
                </Then>
                <Else>
                  <Feather name='heart' {...commonIconProps} />
                </Else>
              </If>
            </TouchableOpacity>
          </PostBar>
        </Then>
        <Else>
          <If condition={comments.length}>
            <Then>{renderComments}</Then>
            <Else>
              <EmptyMessage
                variant='comments'
                message={'Ainda não há comentário\nnesta publicação'}
              />
            </Else>
          </If>
        </Else>
      </If>

      <When condition={isFeed}>
        <DescriptionWrapper>
          <Typography
            variant='nunitoSemiBold'
            text={`@${nickname}: ${description}`}
            fontSize={'medium'}
          />
        </DescriptionWrapper>
      </When>
    </Container>
  );
}
