export interface PublishProps {
  postId: string;
  name: string;
  nickname: string;
  likes: string[];
  uri: string;
  title: string;
  description: string;
  avatarUrl: string;
  onPress(): void;
  isPaused?: boolean;
}
