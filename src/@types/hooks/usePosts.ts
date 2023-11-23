import { PostProps } from '../services';

export interface PostContextData {
  allPosts: PostProps[];
  postsOfUser: PostProps[];
  isLoadingPosts: boolean;
  createPost(props: Omit<PostProps, 'id'>): Promise<boolean>;
  loadPostByUserId(id: string): Promise<void>;
  loadAllPosts(): Promise<void>;
  likePostById(id: string, userId: string): Promise<boolean>;
  deslikePostById(id: string, userId: string): Promise<boolean>;
}
