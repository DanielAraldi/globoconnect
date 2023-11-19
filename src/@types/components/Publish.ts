export type PublishVariant = 'feed' | 'unique';

export interface PublishProps {
  name: string;
  uri: string;
  liked: boolean;
  variant?: 'feed' | 'unique';
}
