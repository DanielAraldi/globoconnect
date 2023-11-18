import { TouchableOpacityProps } from 'react-native';

export type GenericButtonType = 'primary' | 'auth';

export type SocialIconType = 'google' | 'apple';

export type GenericButtonStyleProps = Pick<GenericButtonProps, 'type'>;

export interface GenericButtonProps extends TouchableOpacityProps {
  type: GenericButtonType;
  socialIcon?: SocialIconType;
  text?: string;
  isLoading?: boolean;
}
