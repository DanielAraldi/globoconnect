export interface UserLoginProps {
  email: string;
  password: string;
}

export interface UserProps {
  id: number;
  email: string;
  name: string;
  password: string;
  nickname: string;
  avatarUrl: string;
  followers: number;
  following: number;
  numberOfPosts: number;
}
