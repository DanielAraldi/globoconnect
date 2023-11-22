import { TouchableOpacityProps } from 'react-native';

export interface GenericButtonProps extends TouchableOpacityProps {
  text?: string;
  isLoading?: boolean;
}
