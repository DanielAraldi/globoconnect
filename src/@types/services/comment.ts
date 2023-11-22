import { PostUser } from './posts';

export interface CommentProps {
  id: string;
  postId: string;
  comment: string;
  user: PostUser;
}

export interface CommentServiceProps {
  create(props: Omit<CommentProps, 'id'>): Promise<boolean>;
  loadByPostId(postId: string): Promise<CommentProps[]>;
}
