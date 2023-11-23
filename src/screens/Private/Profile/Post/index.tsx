import { useMemo, useState } from 'react';
import { Else, If, Then } from 'react-if';

import { PostProfileProps } from '../../../../@types';
import { Comment, EmptyMessage, PostTemplate } from '../../../../components';
import { ITENS_LIMIT_BY_PAGE, theme } from '../../../../config';
import { CommentWrapper, Container } from './styles';

export function Post(props: PostProfileProps) {
  const { name, comments, title, description, nickname, uri, avatarUrl } =
    props;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { spacings } = theme;

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

  const renderComments = useMemo(
    () =>
      commentsByPage.map(item => (
        <CommentWrapper key={item.id}>
          <Comment
            variant='commentator'
            comment={item.comment}
            nickname={item.user.nickname}
          />
        </CommentWrapper>
      )),
    [currentPage],
  );

  return (
    <Container
      contentContainerStyle={internalScrollViewStyle}
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={handleNextPage}
    >
      <PostTemplate
        avatarUrl={avatarUrl}
        name={name}
        uri={uri}
        variant='profile'
      />

      <Comment comment={description} nickname={nickname} title={title} />

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
