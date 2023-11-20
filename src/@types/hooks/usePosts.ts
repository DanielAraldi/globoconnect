import { PostProps } from '../services';

export interface PostContextData {
  posts: PostProps[];
  isLoadingPosts: boolean;
  createPost(props: Omit<PostProps, 'id'>): Promise<boolean>;
  loadPostByUserId(id: string): Promise<void>;
}
