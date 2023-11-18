import { TypographyProps } from '../../@types';
import { theme } from '../../config';
import { Text } from './styles';

export function Typography(props: TypographyProps) {
  const {
    text,
    variant = 'nunitoRegular',
    fontSize = 'medium',
    color = theme.colors.light.main,
    textAlign = 'left',
    ...rest
  } = props;

  return (
    <Text
      variant={variant}
      fontSize={fontSize}
      color={color}
      textAlign={textAlign}
      {...rest}
    >
      {text}
    </Text>
  );
}
