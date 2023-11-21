export interface PostUser {
  id: string;
  nickname: string;
  avatarUrl: string;
}

export interface CommentProps {
  id: string;
  postId: number;
  comment: string;
  user: PostUser;
}

export interface PostProps {
  id: string;
  title: string;
  description: string;
  video: string;
  likes: number;
  comments: number;
  liked: boolean;
  user: PostUser;
}

export interface PostServiceProps {
  create(props: Omit<PostProps, 'id'>): Promise<boolean>;
  loadAll(): Promise<PostProps[]>;
  loadById(postId: string): Promise<PostProps | null>;
  loadAllByUserId(userId: string): Promise<PostProps[]>;
}

export interface CommentServiceProps {
  loadByPostId(postId: string): Promise<CommentProps[]>;
}
