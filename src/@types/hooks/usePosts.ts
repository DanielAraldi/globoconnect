import { PostProps } from '../services';

export interface PostContextData {
  allPosts: PostProps[];
  postsOfUser: PostProps[];
  isLoadingPosts: boolean;
  createPost(props: Omit<PostProps, 'id'>): Promise<boolean>;
  loadPostByUserId(id: string): Promise<void>;
  loadAllPosts(): Promise<void>;
}
