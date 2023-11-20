export interface PostUser {
  id: number;
  nickname: string;
  avatarUrl: string;
}

export interface Comment {
  id: number;
  postId: number;
  comment: string;
  user: PostUser;
}

export interface PostProps {
  id: number;
  title: string;
  video: string;
  likes: number;
  comments: number;
  liked: boolean;
  user: PostUser;
}
