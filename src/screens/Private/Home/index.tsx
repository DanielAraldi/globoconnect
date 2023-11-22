import { useCallback, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { FlatList, Keyboard, TouchableNativeFeedback } from 'react-native';

import { CommentProps, PostProps, ViewableItemsProps } from '../../../@types';
import {
  Background,
  Comment,
  EmptyMessage,
  GenericButton,
  Header,
  Load,
  ModalView,
  Refresh,
  TextField,
} from '../../../components';
import { ITENS_LIMIT_BY_PAGE, theme } from '../../../config';
import { useAuth, usePosts } from '../../../hooks';
import { CommentService } from '../../../services';
import { Publish } from './Publish';
import { CenterWrapper, Container, ListDivider, ModalContent } from './styles';

export function Home() {
  const { user } = useAuth();
  const { allPosts, loadAllPosts, isLoadingPosts } = usePosts();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPostRefresh, setIsPostRefresh] = useState<boolean>(false);
  const [isCommentsRefresh, setIsCommentsRefresh] = useState<boolean>(false);
  const [postFocusedIndex, setPostFocusedIndex] = useState<number>(0);
  const [currentPostPage, setCurrentPostPage] = useState<number>(1);
  const [currentCommentsPage, setCurrentCommentsPage] = useState<number>(1);
  const [comment, setComment] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [comments, setComments] = useState<CommentProps[]>([]);

  const { spacings } = theme;

  const postsByPage = ITENS_LIMIT_BY_PAGE * currentPostPage;
  const commentsByPage = ITENS_LIMIT_BY_PAGE * currentCommentsPage;
  const showedPosts = allPosts.slice(0, postsByPage);
  const showedComments = comments.slice(0, commentsByPage);

  function handleNextPostsPage(): void {
    if (allPosts.length > showedPosts.length) {
      setCurrentPostPage(currentPostPage + 1);
    }
  }

  function handleNextCommentsPage(): void {
    if (comments.length > showedComments.length) {
      setCurrentCommentsPage(currentCommentsPage + 1);
    }
  }

  function handleCloseModal(): void {
    setPostId('');
    setComment('');
    setComments([]);
    setCurrentCommentsPage(1);
    setIsOpenModal(false);
  }

  async function loadMorePosts(): Promise<void> {
    setIsPostRefresh(true);
    setCurrentPostPage(1);
    await loadAllPosts();
    setIsPostRefresh(false);
  }

  async function loadMoreComments(): Promise<void> {
    if (comments.length) {
      setIsCommentsRefresh(true);
      setCurrentCommentsPage(1);
      await fetchComments(comments[0].postId);
      setIsCommentsRefresh(false);
    }
  }

  async function fetchComments(postId: string): Promise<void> {
    setPostId(postId);
    const response = await CommentService.loadByPostId(postId);
    setComments(response);
    setIsOpenModal(true);
  }

  async function createComment(): Promise<void> {
    if (comment.trim()) {
      setIsLoading(true);
      const response = await CommentService.create({
        postId,
        comment,
        user: {
          id: user.id,
          avatarUrl: user.avatarUrl,
          nickname: user.nickname,
          name: user.name,
        },
      });

      if (response) handleCloseModal();
      setIsLoading(false);
    }
  }

  const onViewableItemsChanged = useCallback((view: ViewableItemsProps) => {
    setPostFocusedIndex(view.changed[0].index || 0);
  }, []);

  const keyPublishExtractor = useCallback(
    (item: PostProps) => item.id.toString(),
    [allPosts, currentPostPage],
  );

  const renderPublish = useCallback(
    ({ item, index }: RenderItem<PostProps>) => (
      <Publish
        {...item}
        postId={item.id}
        avatarUrl={item.user.avatarUrl}
        name={item.user.name}
        nickname={item.user.nickname}
        uri={item.video}
        isPaused={postFocusedIndex !== index || isOpenModal}
        onPress={async () => await fetchComments(item.id)}
      />
    ),
    [postFocusedIndex, allPosts, isOpenModal, currentPostPage],
  );

  const keyCommentExtractor = useCallback(
    (item: CommentProps) => item.id.toString(),
    [comments, currentCommentsPage],
  );

  const renderComment = useCallback(
    ({ item }: RenderItem<CommentProps>) => (
      <Comment comment={item.comment} nickname={item.user.nickname} />
    ),
    [comments, currentCommentsPage],
  );

  return (
    <Container>
      <Background>
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
          <>
            <Header variant='logout' />

            <FlatList
              data={showedPosts}
              contentContainerStyle={{ flexGrow: 1 }}
              keyExtractor={keyPublishExtractor}
              renderItem={renderPublish}
              showsVerticalScrollIndicator={false}
              onEndReached={handleNextPostsPage}
              onEndReachedThreshold={0.1}
              ItemSeparatorComponent={() => <ListDivider />}
              refreshControl={
                <Refresh refreshing={isPostRefresh} onRefresh={loadMorePosts} />
              }
              ListEmptyComponent={() => (
                <CenterWrapper>
                  <If condition={isLoadingPosts && !isPostRefresh}>
                    <Then>
                      <Load />
                    </Then>
                    <Else>
                      <EmptyMessage
                        variant='posts'
                        message={'Ainda não há publicações\nno feed no momento'}
                      />
                    </Else>
                  </If>
                </CenterWrapper>
              )}
              viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 50,
                minimumViewTime: 250,
              }}
              onViewableItemsChanged={onViewableItemsChanged}
            />

            <ModalView
              visible={isOpenModal}
              onRequestClose={handleCloseModal}
              onDismiss={handleCloseModal}
              isDisabledClose={isLoading}
            >
              <ModalContent>
                <TextField
                  value={comment}
                  autoCorrect
                  autoFocus
                  variant='secondary'
                  returnKeyType='send'
                  placeholder='Deixe seu comentário'
                  marginBottom={spacings[3]}
                  onChangeText={setComment}
                  editable={!isLoading}
                  onSubmitEditing={createComment}
                />

                <FlatList
                  contentContainerStyle={{ paddingBottom: spacings[4] }}
                  data={showedComments}
                  keyExtractor={keyCommentExtractor}
                  renderItem={renderComment}
                  showsVerticalScrollIndicator={false}
                  onEndReached={handleNextCommentsPage}
                  onEndReachedThreshold={0.1}
                  refreshControl={
                    <Refresh
                      refreshing={isCommentsRefresh}
                      onRefresh={loadMoreComments}
                    />
                  }
                  ListEmptyComponent={() => (
                    <EmptyMessage
                      variant='comments'
                      message={'Ainda não há comentários\nnesta publicação'}
                    />
                  )}
                />

                <GenericButton
                  text='Enviar'
                  disabled={!comment.trim()}
                  onPress={createComment}
                  isLoading={isLoading}
                />
              </ModalContent>
            </ModalView>
          </>
        </TouchableNativeFeedback>
      </Background>
    </Container>
  );
}
