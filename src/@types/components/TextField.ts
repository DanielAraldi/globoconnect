import { TextInputProps } from 'react-native';

export type TextFieldVariant = 'primary' | 'secondary';

export type TextFieldType = 'email' | 'password' | 'text';

export type TextFieldStyleProps = Omit<TextFieldProps, 'type' | 'isLoading'> & {
  isFocused?: boolean;
  isDisabled?: boolean;
};

export interface TextFieldProps extends TextInputProps {
  variant?: TextFieldVariant;
  type?: TextFieldType;
  isLoading?: boolean;
  marginTop?: number;
  marginBottom?: number;
}
