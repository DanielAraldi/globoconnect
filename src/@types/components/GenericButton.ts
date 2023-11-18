import { TouchableOpacityProps } from 'react-native';

export type GenericButtonType = 'primary' | 'auth';

export type SocialIconType = 'google' | 'apple';

export type GenericButtonStyleProps = Pick<
  GenericButtonProps,
  'type' | 'hugWidth'
>;

export interface GenericButtonProps extends TouchableOpacityProps {
  type: GenericButtonType;
  hugWidth?: boolean;
  socialIcon?: SocialIconType;
  text?: string;
  isLoading?: boolean;
}
