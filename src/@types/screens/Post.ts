import { CommentProps } from '../services';

export interface PostProfileProps {
  name: string;
  comments: CommentProps[];
  title: string;
  description: string;
  nickname: string;
  uri: string;
  avatarUrl: string;
}
