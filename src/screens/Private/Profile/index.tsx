import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { FlatList, View } from 'react-native';

import { CommentProps, PostProps, UserProps } from '../../../@types';
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
import { useAuth, usePosts } from '../../../hooks';
import { CommentService } from '../../../services';
import { formatNumbersToShowInProfile } from '../../../utils';
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
  const { user } = useAuth();
  const { postsOfUser, isLoadingPosts, loadPostByUserId } = usePosts();

  const route = useRoute();
  const params = route.params as UserProps;
  const isVisit = !!params?.id;

  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [postSelected, setPostSelected] = useState<PostProps>({} as PostProps);

  const { colors, spacings } = theme;

  const isLoadingList = isLoadingPosts && !isRefresh;
  const userId = isVisit ? params.id : user.id;
  const username = isVisit ? params.name : user.name;
  const nickname = isVisit ? params.nickname : user.nickname;
  const avatarUrl = isVisit ? params.avatarUrl : user.avatarUrl;
  const followers = isVisit ? params.followers : user.followers;
  const following = isVisit ? params.following : user.following;
  const totalPosts = formatNumbersToShowInProfile(postsOfUser.length);
  const totalFollowers = formatNumbersToShowInProfile(followers);
  const totalFollowing = formatNumbersToShowInProfile(following);
  const itemsByPage = ITENS_LIMIT_BY_PAGE * currentPage;
  const posts = isLoadingList ? [] : postsOfUser.slice(0, itemsByPage);

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

  async function loadMorePosts(): Promise<void> {
    setIsRefresh(true);
    setCurrentPage(1);
    await loadPostByUserId(userId);
    setIsRefresh(false);
  }

  const keyExtractor = useCallback(
    (item: PostProps) => item.id.toString(),
    [postsOfUser],
  );

  const renderItem = useCallback(
    ({ item }: RenderItem<PostProps>) => (
      <Thumbnail
        url={item.video}
        onPress={async () => await handleSelectPost(item)}
      />
    ),
    [postsOfUser],
  );

  useFocusEffect(
    useCallback(() => {
      loadPostByUserId(userId);
    }, [isVisit]),
  );

  return (
    <Background>
      <Header variant='profile' nickname={nickname} />

      <Container>
        <UserContainer>
          <Avatar variant='profile' avatarUrl={avatarUrl} />

          <SocialContent>
            <View>
              <Typography
                text={totalPosts}
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
                text={totalFollowers}
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
                text={totalFollowing}
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
          text={username}
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
            refreshControl={
              <Refresh refreshing={isRefresh} onRefresh={loadMorePosts} />
            }
            ListEmptyComponent={() => (
              <If condition={isLoadingList}>
                <Then>
                  <LoadContent>
                    <Load />
                  </LoadContent>
                </Then>
                <Else>
                  <EmptyMessage
                    variant='posts'
                    message={'Não há publiações\nfeitas no momento'}
                  />
                </Else>
              </If>
            )}
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
