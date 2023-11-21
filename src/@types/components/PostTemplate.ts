export type PostTempalteVariant = 'feed' | 'profile';

export interface PostTemplateStyleProps {
  variant: PostTempalteVariant;
}

export interface PostTemplateProps {
  avatarUrl: string;
  name: string;
  uri: string;
  variant?: PostTempalteVariant;
  isPaused?: boolean;
}
