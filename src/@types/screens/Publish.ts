export interface PublishProps {
  postId: string;
  name: string;
  nickname: string;
  liked: boolean;
  likes: number;
  uri: string;
  title: string;
  description: string;
  avatarUrl: string;
  onPress(): void;
  isPaused?: boolean;
}
