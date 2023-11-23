import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { PostContextData, PostProps } from '../@types';
import { PostService } from '../services';

const PostContext = createContext({} as PostContextData);

export function PostProvider({ children }: Required<PropsWithChildren>) {
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<PostProps[]>([]);
  const [postsOfUser, setPostsOfUser] = useState<PostProps[]>([]);

  async function loadPostByUserId(id: string): Promise<void> {
    setIsLoadingPosts(true);
    const posts = await PostService.loadAllByUserId(id);
    setPostsOfUser(posts);
    setIsLoadingPosts(false);
  }

  async function loadAllPosts(): Promise<void> {
    setIsLoadingPosts(true);
    const posts = await PostService.loadAll();
    setAllPosts(posts);
    setIsLoadingPosts(false);
  }

  async function createPost(props: Omit<PostProps, 'id'>): Promise<boolean> {
    setIsLoadingPosts(true);
    const isCreated = await PostService.create(props);
    await loadPostByUserId(props.user.id);
    await loadAllPosts();
    setIsLoadingPosts(false);
    return isCreated;
  }

  async function likePostById(id: string, userId: string): Promise<boolean> {
    const currentLikesOfPost: string[] = [];
    const posts = allPosts.map(post => {
      if (post.id === id) {
        const likesOfPost = [...post.likes, userId];
        currentLikesOfPost.push(...likesOfPost);
        return { ...post, likes: likesOfPost };
      }
      return post;
    });
    setAllPosts(posts);
    const isLiked = await PostService.like(id, currentLikesOfPost);
    return isLiked;
  }

  async function deslikePostById(id: string, userId: string): Promise<boolean> {
    const currentLikesOfPost: string[] = [];
    const posts = allPosts.map(post => {
      if (post.id === id) {
        const likesOfPost = post.likes.filter(likeId => likeId !== userId);
        currentLikesOfPost.push(...likesOfPost);
        return { ...post, likes: likesOfPost };
      }
      return post;
    });
    setAllPosts(posts);
    const isDesliked = await PostService.deslike(id, currentLikesOfPost);
    return isDesliked;
  }

  return (
    <PostContext.Provider
      value={{
        postsOfUser,
        allPosts,
        isLoadingPosts,
        createPost,
        loadAllPosts,
        loadPostByUserId,
        likePostById,
        deslikePostById,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}
