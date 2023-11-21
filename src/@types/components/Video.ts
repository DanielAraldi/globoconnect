export type VideoVariant = 'preview' | 'post';

export interface VideoStyleProps {
  variant: VideoVariant;
}

export interface VideoProps {
  uri: string;
  variant?: VideoVariant;
  isPaused?: boolean;
}
