import { TextInputProps } from 'react-native';

export type TextFieldVariant = 'email' | 'password' | 'text';

export type TextFieldStyleProps = Omit<
  TextFieldProps,
  'variant' | 'isLoading'
> & {
  isFocused?: boolean;
  isDisabled?: boolean;
};

export interface TextFieldProps extends TextInputProps {
  variant?: TextFieldVariant;
  isLoading?: boolean;
  marginTop?: number;
  marginBottom?: number;
}
