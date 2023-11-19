import { Comment } from '../services';

export type PublishVariant = 'feed' | 'unique';

export interface PublishStyleProps {
  variant: 'feed' | 'unique';
}

export interface PublishProps {
  name: string;
  uri: string;
  liked: boolean;
  comments: Comment[];
  variant?: 'feed' | 'unique';
}
