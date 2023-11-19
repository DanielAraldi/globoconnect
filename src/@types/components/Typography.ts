import { TextProps } from 'react-native';

export type TypographyVariant =
  | 'nunitoRegular'
  | 'nunitoSemiBold'
  | 'nunitoBold';

export type TypographyFontSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';

export type TypographyAlign = 'center' | 'left' | 'right';

export type TypographyStyleProps = Pick<
  Required<TypographyProps>,
  'fontSize' | 'color' | 'variant' | 'textAlign' | 'isCapitalized'
>;

export interface TypographyProps extends TextProps {
  text: string;
  variant?: TypographyVariant;
  fontSize?: TypographyFontSize;
  color?: string;
  textAlign?: TypographyAlign;
  isCapitalized?: boolean;
}
