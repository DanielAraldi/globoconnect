export type UserCommentVariant = 'owner' | 'commentator';

export interface UserCommentStyleProps {
  variant: UserCommentVariant;
}

export interface UserCommentProps {
  nickname: string;
  comment: string;
  title?: string;
  variant?: UserCommentVariant;
}
