export interface PostUser {
  id: string;
  nickname: string;
  avatarUrl: string;
  name: string;
}

export interface CommentProps {
  id: string;
  postId: string;
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
  like(postId: string, currentLikes: number): Promise<boolean>;
  deslike(postId: string, currentLikes: number): Promise<boolean>;
}

export interface CommentServiceProps {
  create(props: Omit<CommentProps, 'id'>): Promise<boolean>;
  loadByPostId(postId: string): Promise<CommentProps[]>;
}
