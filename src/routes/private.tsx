import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens';

const { Navigator, Screen } = createBottomTabNavigator();

export function PrivateRoutes() {
  return (
    <Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Home' component={Home} />
    </Navigator>
  );
}
