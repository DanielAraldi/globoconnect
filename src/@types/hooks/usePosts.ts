import { PostProps } from '../services';

export type LoadPostByUserIdType = 'owner' | 'visit';

export interface PostContextData {
  allPosts: PostProps[];
  postsOfUser: PostProps[];
  postsOfUserVisited: PostProps[];
  isLoadingPosts: boolean;
  createPost(props: Omit<PostProps, 'id'>): Promise<boolean>;
  loadPostByUserId(id: string, type: LoadPostByUserIdType): Promise<void>;
  loadAllPosts(): Promise<void>;
  likePostById(id: string, userId: string): Promise<boolean>;
  deslikePostById(id: string, userId: string): Promise<boolean>;
}
