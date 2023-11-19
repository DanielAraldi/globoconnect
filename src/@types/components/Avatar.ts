import { PressableProps } from 'react-native';

export type AvatarStyleProps = Pick<AvatarProps, 'variant'>;

export interface AvatarProps extends PressableProps {
  variant: 'profile' | 'post';
}
