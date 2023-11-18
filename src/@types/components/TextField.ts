import { TextInputProps } from 'react-native';

export type TextFieldVariant = 'email' | 'password' | 'text';

export type TextFieldStyleProps = Pick<
  TextFieldProps,
  'marginBottom' | 'marginTop'
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
