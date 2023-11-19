import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ResizeMode } from 'expo-av';
import { useMemo } from 'react';
import { Else, If, Then, When } from 'react-if';
import { Share, TouchableOpacity } from 'react-native';

import { PublishProps } from '../../@types';
import { theme } from '../../config';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import { UserComment } from '../UserComment';
import { Container, PostBar, PostVideo, UserBar, Username } from './styles';

export function Publish(props: PublishProps) {
  const { name, uri, liked, comments, variant = 'feed' } = props;

  const { colors, spacings } = theme;

  const commonIconProps = {
    color: colors.light.main,
    size: spacings[5],
  };

  async function handleShare(): Promise<void> {
    const message = `Ei, da uma olhada nesse vídeo! Acesso em: ${uri}`;

    Share.share({
      message,
      url: uri,
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
    <Container>
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

      <PostVideo
        variant={variant}
        source={{ uri }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        volume={1}
      />

      <When condition={variant === 'feed'}>
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
      </When>

      {renderComments}
    </Container>
  );
}
