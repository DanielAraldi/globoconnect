import { useMemo } from 'react';
import { Else, If, Then } from 'react-if';

import { PostProfileProps } from '../../../../@types';
import {
  EmptyMessage,
  PostTemplate,
  Typography,
  UserComment,
} from '../../../../components';
import { theme } from '../../../../config';
import { Container, PostMessageWrapper } from './styles';

export function Post(props: PostProfileProps) {
  const { name, comments, title, description, nickname, uri, avatarUrl } =
    props;

  const { spacings } = theme;

  const internalScrollViewStyle = {
    paddingBottom: spacings[9],
  };

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
    <Container contentContainerStyle={internalScrollViewStyle}>
      <PostTemplate
        avatarUrl={avatarUrl}
        name={name}
        uri={uri}
        variant='profile'
      />

      {renderPostMessage}

      <If condition={comments.length}>
        <Then>{renderComments}</Then>
        <Else>
          <EmptyMessage
            variant='comments'
            message={'Ainda não há comentários\nnesta publicação'}
          />
        </Else>
      </If>
    </Container>
  );
}
