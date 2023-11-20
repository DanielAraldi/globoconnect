import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { PostContextData, PostProps } from '../@types';
import { PostService } from '../services';

const PostContext = createContext({} as PostContextData);

export function PostProvider({ children }: Required<PropsWithChildren>) {
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostProps[]>([]);

  async function loadPostByUserId(id: string): Promise<void> {
    setIsLoadingPosts(true);
    const response = await PostService.loadAllByUserId(id);
    setPosts(response);
    setIsLoadingPosts(false);
  }

  async function createPost(props: Omit<PostProps, 'id'>): Promise<boolean> {
    setIsLoadingPosts(true);
    const response = await PostService.create(props);
    await loadPostByUserId(props.user.id);
    setIsLoadingPosts(false);
    return response;
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoadingPosts,
        createPost,
        loadPostByUserId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}
