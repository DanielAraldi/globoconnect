import { AuthServiceProps, UserProps } from '../@types';
import { api } from '../config';

export const AuthService: AuthServiceProps = {
  async signIn(props): Promise<UserProps | null> {
    try {
      const { email, password } = props;
      const { data } = await api.get<UserProps[]>('/users', {
        params: {
          email,
          password,
        },
      });
      return data.length ? data[0] : null;
    } catch (error) {
      return null;
    }
  },

  async loadByNickname(nickname: string): Promise<UserProps | null> {
    try {
      const { data } = await api.get<UserProps[]>('/users', {
        params: {
          nickname,
        },
      });
      return data.length ? data[0] : null;
    } catch (error) {
      return null;
    }
  },
};
