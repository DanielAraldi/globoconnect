import { useMemo, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { RefreshControl } from 'react-native';

import { PostProfileProps } from '../../../../@types';
import {
  EmptyMessage,
  PostTemplate,
  Typography,
  UserComment,
} from '../../../../components';
import { ITENS_LIMIT_BY_PAGE, theme } from '../../../../config';
import { Container, PostMessageWrapper } from './styles';

export function Post(props: PostProfileProps) {
  const { name, comments, title, description, nickname, uri, avatarUrl } =
    props;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { spacings, colors } = theme;

  const itemsByPage = ITENS_LIMIT_BY_PAGE * currentPage;
  const commentsByPage = comments.slice(0, itemsByPage);
  const internalScrollViewStyle = {
    paddingBottom: spacings[9],
  };

  function handleNextPage(): void {
    if (comments.length > commentsByPage.length) {
      setCurrentPage(currentPage + 1);
    }
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

  const renderComments = useMemo(
    () =>
      commentsByPage.map(item => (
        <UserComment
          key={item.id}
          comment={item.comment}
          nickname={item.user.nickname}
        />
      )),
    [currentPage],
  );

  return (
    <Container
      contentContainerStyle={internalScrollViewStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => setCurrentPage(1)}
          tintColor={colors.primary}
          size={spacings[2]}
        />
      }
      onScrollEndDrag={handleNextPage}
    >
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
