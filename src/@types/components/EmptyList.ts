export type EmptyListIcon = 'comment-off-outline' | 'post';

export interface EmptyListProps {
  variant: 'comments' | 'posts';
  message: string;
}
