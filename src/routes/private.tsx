import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { theme } from '../config';
import { Add, Home, Profile } from '../screens';

const { Navigator, Screen } = createBottomTabNavigator();

export function PrivateRoutes() {
  const { colors, spacings } = theme;

  function handleColor(isFocused: boolean): string {
    return isFocused ? colors.light.main : colors.light.overlay['50p'];
  }

  return (
    <Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.main,
          borderTopColor: colors.light.main,
        },
      }}
    >
      <Screen
        name='Home'
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name='home'
              size={spacings[5]}
              color={handleColor(focused)}
            />
          ),
        }}
      />
      <Screen
        name='Add'
        component={Add}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name='plus-circle'
              size={spacings[5]}
              color={handleColor(focused)}
            />
          ),
        }}
      />
      <Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name='user'
              size={spacings[5]}
              color={handleColor(focused)}
            />
          ),
        }}
      />
    </Navigator>
  );
}
