import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName='PublicRoutes'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name='PublicRoutes' component={PublicRoutes} />
        <Screen name='PrivateRoutes' component={PrivateRoutes} />
      </Navigator>
    </NavigationContainer>
  );
}
