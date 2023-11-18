import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens';

const { Navigator, Screen } = createStackNavigator();

export function PublicRoutes() {
  return (
    <Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Login' component={Login} />
    </Navigator>
  );
}
