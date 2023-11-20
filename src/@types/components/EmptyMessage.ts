export type EmptyMessageIcon =
  | 'comment-off-outline'
  | 'post'
  | 'camera-off-outline';

export type EmptyMessageVariant = 'comments' | 'posts' | 'camera';

export interface EmptyMessageProps {
  variant: EmptyMessageVariant;
  message: string;
  onPress?(): void;
}
