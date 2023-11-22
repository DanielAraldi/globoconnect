import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { AuthContextData, UserLoginProps, UserProps } from '../@types';
import { Storage } from '../libs';
import { AuthService } from '../services';

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: Required<PropsWithChildren>) {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  async function signIn(props: UserLoginProps): Promise<boolean> {
    setIsLoadingAuth(true);
    const response = await AuthService.signIn(props);
    if (response) {
      setUser(response);
      await Storage.set<UserProps>('user', response);
    } else {
      setUser({} as UserProps);
    }
    setIsLoadingAuth(false);
    setIsLogged(!!response);
    return !!response;
  }

  async function signOut(): Promise<void> {
    setIsLoadingAuth(true);
    setIsLogged(false);
    await Storage.clear();
    setUser({} as UserProps);
    setIsLoadingAuth(false);
  }

  async function loadUser(): Promise<void> {
    const response = await Storage.get<UserProps>('user');
    if (response) setUser(response);
    else setUser({} as UserProps);
    setIsLogged(!!response);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth,
        isLogged,
        signIn,
        signOut,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
