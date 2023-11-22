import { UserLoginProps, UserProps } from '../services';

export interface AuthContextData {
  user: UserProps;
  isLogged: boolean;
  isLoadingAuth: boolean;
  signIn(props: UserLoginProps): Promise<boolean>;
  signOut(): Promise<void>;
  loadUser(): Promise<void>;
}
