import { PressableProps } from 'react-native';

export type UserPhotoStyleProps = Pick<UserPhotoProps, 'variant'>;

export interface UserPhotoProps extends PressableProps {
  variant: 'profile' | 'post';
}
