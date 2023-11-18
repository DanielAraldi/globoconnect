import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Typography } from '../components';
import { theme } from '../config';
import { Home, Profile } from '../screens';

const { Navigator, Screen } = createBottomTabNavigator();

export function PrivateRoutes() {
  const { colors } = theme;

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
          tabBarLabel: ({ focused }) => (
            <Typography
              text='Home'
              variant='nunitoRegular'
              textAlign='center'
              fontSize='small'
              color={handleColor(focused)}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name='home' size={16} color={handleColor(focused)} />
          ),
        }}
      />
      <Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <Typography
              text='Perfil'
              variant='nunitoRegular'
              textAlign='center'
              fontSize='small'
              color={handleColor(focused)}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather name='user' size={16} color={handleColor(focused)} />
          ),
        }}
      />
    </Navigator>
  );
}
