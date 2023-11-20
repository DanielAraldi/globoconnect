export interface PostUser {
  id: string;
  nickname: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  postId: number;
  comment: string;
  user: PostUser;
}

export interface PostProps {
  id: string;
  title: string;
  video: string;
  likes: number;
  comments: number;
  liked: boolean;
  user: PostUser;
}

export interface PostServiceProps {
  create(props: Omit<PostProps, 'id'>): Promise<boolean>;
}
