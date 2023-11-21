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
  Publish,
  Thumbnail,
  Typography,
} from '../../../components';
import { theme } from '../../../config';
import { usePosts } from '../../../hooks';
import { CommentService } from '../../../services';
import {
  Container,
  LoadContent,
  PostContent,
  PostHeader,
  SocialContent,
  UserContainer,
} from './styles';

export function Profile() {
  const { posts, isLoadingPosts, loadPostByUserId } = usePosts();

  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [postSelected, setPostSelected] = useState<PostProps>({} as PostProps);

  const { colors, spacings } = theme;

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
            numColumns={2}
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
        <Publish
          url={postSelected?.video}
          nickname={postSelected?.user?.nickname}
          title={postSelected?.title}
          description={postSelected?.description}
          comments={comments}
          name={'Diego 3g'}
          variant='unique'
          liked={postSelected?.liked || false}
        />
      </ModalView>
    </Background>
  );
}
