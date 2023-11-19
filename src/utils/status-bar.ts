import { NativeModules, Platform } from 'react-native';

export function getStatusBarHeight(): number {
  const { StatusBarManager } = NativeModules;
  return Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
}
