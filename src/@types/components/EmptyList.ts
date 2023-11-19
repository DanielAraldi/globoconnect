export type EmptyListIcon = 'comment-off-outline' | 'post-outline';

export interface EmptyListProps {
  variant: 'comments' | 'posts';
  message: string;
}
