import { FontAwesome5 } from '@expo/vector-icons';
import { Else, If, Then } from 'react-if';

import { GenericButtonProps } from '../../@types';
import { theme } from '../../config';
import { Load } from '../Load';
import { Typography } from '../Typography';
import { Container, StyleLine } from './styles';

export function GenericButton(props: GenericButtonProps) {
  const {
    type,
    text = '',
    socialIcon = 'google',
    hugWidth = false,
    isLoading = false,
    disabled = false,
    ...rest
  } = props;

  const { colors } = theme;

  const isDisabled = isLoading || disabled;
  const textAndIconColor = isDisabled
    ? colors.light.overlay['50p']
    : colors.light.main;

  const { container } = StyleLine(isDisabled);

  return (
    <Container
      type={type}
      hugWidth={hugWidth}
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
          <If condition={type === 'auth'}>
            <Then>
              <FontAwesome5
                size={24}
                name={socialIcon}
                color={textAndIconColor}
              />
            </Then>
            <Else>
              <Typography
                text={text}
                color={textAndIconColor}
                textAlign='center'
                variant='nunitoBold'
              />
            </Else>
          </If>
        </Else>
      </If>
    </Container>
  );
}
