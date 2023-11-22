import { Else, If, Then } from 'react-if';

import { GenericButtonProps } from '../../@types';
import { theme } from '../../config';
import { Load } from '../Load';
import { Typography } from '../Typography';
import { Container, StyleLine } from './styles';

export function GenericButton(props: GenericButtonProps) {
  const { text = '', isLoading = false, disabled = false, ...rest } = props;

  const { colors } = theme;

  const isDisabled = isLoading || disabled;
  const textColor = isDisabled
    ? colors.light.overlay['50p']
    : colors.light.main;

  const { container } = StyleLine(isDisabled);

  return (
    <Container
      style={container}
      activeOpacity={0.85}
      disabled={isDisabled}
      {...rest}
    >
      <If condition={isLoading}>
        <Then>
          <Load />
        </Then>
        <Else>
          <Typography
            text={text}
            color={textColor}
            textAlign='center'
            variant='nunitoBold'
          />
        </Else>
      </If>
    </Container>
  );
}
