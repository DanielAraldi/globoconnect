import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { CommentProps, PostProps } from '../../../@types';
import {
  Avatar,
  Background,
  EmptyMessage,
  Header,
  Load,
  ModalView,
  Refresh,
  Thumbnail,
  Typography,
} from '../../../components';
import { ITENS_LIMIT_BY_PAGE, theme } from '../../../config';
import { usePosts } from '../../../hooks';
import { CommentService } from '../../../services';
import { Post } from './Post';
import {
  Container,
  LoadContent,
  PostContent,
  PostHeader,
  SocialContent,
  UserContainer,
} from './styles';

export function Profile() {
  const { postsOfUser, isLoadingPosts, loadPostByUserId } = usePosts();

  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [postSelected, setPostSelected] = useState<PostProps>({} as PostProps);

  const { colors, spacings } = theme;

  const itemsByPage = ITENS_LIMIT_BY_PAGE * currentPage;
  const posts = postsOfUser.slice(0, itemsByPage);

  function handleValueDigits(value: string): string {
    return (
      {
        4: value[0],
        5: value.slice(0, 2),
        6: value.slice(0, 3),
        7: value[0],
        8: value.slice(0, 2),
        9: value.slice(0, 3),
      }[value.length] || value
    );
  }

  function handleQuantityOfValues(value: number): string {
    const valueAsString = value.toString();
    const amountDigits = valueAsString.length;
    const digits = handleValueDigits(valueAsString);

    if (amountDigits <= 3) return valueAsString;

    return `${digits}${amountDigits < 7 ? 'mil' : 'mi'}`;
  }

  function handleCloseModal(): void {
    setIsOpenPost(false);
  }

  function handleNextPage(): void {
    if (postsOfUser.length > posts.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  async function fetchComments(postId: string): Promise<void> {
    const response = await CommentService.loadByPostId(postId);
    setComments(response);
  }

  async function handleSelectPost(post: PostProps): Promise<void> {
    await fetchComments(post.id);
    setPostSelected(post);
    setIsOpenPost(true);
  }

  const keyExtractor = useCallback((item: PostProps) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item }: RenderItem<PostProps>) => (
      <Thumbnail
        url={item.video}
        onPress={async () => await handleSelectPost(item)}
      />
    ),
    [],
  );

  useEffect(() => {
    loadPostByUserId('d697a33e-6626-4edf-b3e7-f2df27007632');
  }, []);

  return (
    <Background>
      <Header variant='profile' />

      <Container>
        <UserContainer>
          <Avatar variant='profile' />

          <SocialContent>
            <View>
              <Typography
                text={handleQuantityOfValues(1)}
                variant='nunitoRegular'
                textAlign='center'
                fontSize='medium'
              />

              <Typography
                text='Publicações'
                variant='nunitoRegular'
                textAlign='center'
                fontSize='small'
              />
            </View>
          </SocialContent>

          <SocialContent>
            <View>
              <Typography
                text={handleQuantityOfValues(25434)}
                variant='nunitoRegular'
                textAlign='center'
                fontSize='medium'
              />

              <Typography
                text='Seguidores'
                variant='nunitoRegular'
                textAlign='center'
                fontSize='small'
              />
            </View>
          </SocialContent>

          <SocialContent>
            <View>
              <Typography
                text={handleQuantityOfValues(180)}
                variant='nunitoRegular'
                textAlign='center'
                fontSize='medium'
              />

              <Typography
                text='Seguindo'
                variant='nunitoRegular'
                textAlign='center'
                fontSize='small'
              />
            </View>
          </SocialContent>
        </UserContainer>

        <Typography
          text='Diego 3g'
          variant='nunitoRegular'
          textAlign='left'
          fontSize='medium'
          isCapitalized
        />

        <PostHeader>
          <MaterialCommunityIcons
            name='post-outline'
            color={colors.light.main}
            size={spacings[3]}
          />

          <Typography
            text='Publicações'
            variant='nunitoRegular'
            textAlign='center'
            fontSize='medium'
          />
        </PostHeader>

        <PostContent>
          <FlatList
            data={posts}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
            onEndReached={handleNextPage}
            onEndReachedThreshold={0.1}
            numColumns={2}
            refreshControl={<Refresh onRefresh={() => setCurrentPage(1)} />}
            ListEmptyComponent={() =>
              isLoadingPosts ? (
                <LoadContent>
                  <Load />
                </LoadContent>
              ) : (
                <EmptyMessage
                  variant='posts'
                  message={'Não há publiações\nfeitas no momento'}
                />
              )
            }
          />
        </PostContent>
      </Container>

      <ModalView
        visible={isOpenPost}
        onDismiss={handleCloseModal}
        onRequestClose={handleCloseModal}
      >
        <Post
          avatarUrl={postSelected?.user?.avatarUrl}
          comments={comments}
          description={postSelected?.description}
          name={postSelected?.user?.name}
          nickname={postSelected?.user?.nickname}
          title={postSelected?.title}
          uri={postSelected?.video}
        />
      </ModalView>
    </Background>
  );
}
