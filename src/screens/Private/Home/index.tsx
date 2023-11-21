import { useCallback, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { FlatList, Keyboard, TouchableNativeFeedback } from 'react-native';

import { CommentProps, PostProps, ViewableItemsProps } from '../../../@types';
import {
  Background,
  EmptyMessage,
  GenericButton,
  Header,
  Load,
  ModalView,
  TextField,
  UserComment,
} from '../../../components';
import { theme } from '../../../config';
import { usePosts } from '../../../hooks';
import { CommentService } from '../../../services';
import { Publish } from './Publish';
import { CenterWrapper, Container, ListDivider, ModalContent } from './styles';

export function Home() {
  const { allPosts, loadAllPosts, isLoadingPosts } = usePosts();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postFocusedIndex, setPostFocusedIndex] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [comments, setComments] = useState<CommentProps[]>([]);

  const { spacings } = theme;

  function handleCloseModal(): void {
    setPostId('');
    setComment('');
    setComments([]);
    setIsOpenModal(false);
  }

  async function fetchComments(postId: string): Promise<void> {
    setPostId(postId);
    const response = await CommentService.loadByPostId(postId);
    setComments(response);
    setIsOpenModal(true);
  }

  async function createComment(): Promise<void> {
    setIsLoading(true);
    const response = await CommentService.create({
      postId,
      comment,
      user: {
        id: 'd697a33e-6626-4edf-b3e7-f2df27007632',
        avatarUrl: 'https://avatars.githubusercontent.com/u/2254731?v=4',
        nickname: 'diego3g',
        name: 'Diego 3g',
      },
    });

    if (response) handleCloseModal();
    setIsLoading(false);
  }

  const onViewableItemsChanged = useCallback((view: ViewableItemsProps) => {
    setPostFocusedIndex(view.changed[0].index || 0);
  }, []);

  const keyPublishExtractor = useCallback(
    (item: PostProps) => item.id.toString(),
    [],
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
    [postFocusedIndex, isOpenModal],
  );

  const keyCommentExtractor = useCallback(
    (item: CommentProps) => item.id.toString(),
    [],
  );

  const renderComment = useCallback(
    ({ item }: RenderItem<CommentProps>) => (
      <UserComment comment={item.comment} nickname={item.user.nickname} />
    ),
    [],
  );

  useEffect(() => {
    loadAllPosts();
  }, []);

  return (
    <Container>
      <Background>
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
          <>
            <Header variant='logout' />

            <FlatList
              data={allPosts}
              contentContainerStyle={{ flexGrow: 1 }}
              keyExtractor={keyPublishExtractor}
              renderItem={renderPublish}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider />}
              ListEmptyComponent={() => (
                <CenterWrapper>
                  <If condition={isLoadingPosts}>
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
                itemVisiblePercentThreshold: 50,
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
                  data={comments}
                  keyExtractor={keyCommentExtractor}
                  renderItem={renderComment}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <EmptyMessage
                      variant='comments'
                      message={'Ainda não há comentários\nnesta publicação'}
                    />
                  )}
                />

                <GenericButton
                  type='primary'
                  text='Enviar'
                  disabled={!comment}
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
