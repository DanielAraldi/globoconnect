export interface UserLoginProps {
  email: string;
  password: string;
}

export interface UserProps {
  id: string;
  email: string;
  name: string;
  password: string;
  nickname: string;
  avatarUrl: string;
  followers: number;
  following: number;
}

export interface AuthServiceProps {
  signIn(props: UserLoginProps): Promise<UserProps | null>;
}
