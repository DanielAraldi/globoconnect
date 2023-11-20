import { CommentProps } from '../services';

export type PublishVariant = 'feed' | 'unique';

export interface PublishStyleProps {
  variant: 'feed' | 'unique';
}

export interface PublishProps {
  name: string;
  nickname: string;
  liked: boolean;
  comments: CommentProps[];
  url: string;
  description: string;
  variant?: 'feed' | 'unique';
}
