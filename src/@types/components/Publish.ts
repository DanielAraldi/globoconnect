import { Comment } from '../services';

export type PublishVariant = 'feed' | 'unique';

export interface PublishStyleProps {
  variant: 'feed' | 'unique';
}

export interface PublishProps {
  name: string;
  nickname: string;
  liked: boolean;
  comments: Comment[];
  url: string;
  description: string;
  variant?: 'feed' | 'unique';
}
