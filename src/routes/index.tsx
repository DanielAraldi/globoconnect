import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Else, If, Then } from 'react-if';

import { UserProps } from '../@types';
import { useAuth, usePosts } from '../hooks';
import { Storage } from '../libs';
import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';

SplashScreen.preventAutoHideAsync();

export function Routes() {
  const { isLogged, loadUser } = useAuth();
  const { loadAllPosts, loadPostByUserId } = usePosts();

  async function loadAllAboutUser(): Promise<void> {
    const userStoraged = await Storage.get<UserProps>('user');
    if (userStoraged) {
      await loadUser();
      await loadPostByUserId(userStoraged.id, 'owner');
      await loadAllPosts();
    }
    await SplashScreen.hideAsync();
  }

  useEffect(() => {
    loadAllAboutUser();
  }, []);

  return (
    <NavigationContainer>
      <If condition={isLogged}>
        <Then>
          <PrivateRoutes />
        </Then>
        <Else>
          <PublicRoutes />
        </Else>
      </If>
    </NavigationContainer>
  );
}
