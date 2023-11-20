import styled from 'styled-components/native';

import { ModalViewStyleProps } from '../../@types';
import { theme } from '../../config';

const { colors, spacings } = theme;

export const Overlay = styled.View`
  flex: 1;

  background-color: ${colors.background.overlay['50p']};
`;

export const Container = styled.View<ModalViewStyleProps>`
  flex: 1;

  margin-top: ${({ variant }) => (variant === 'full' ? 0 : spacings[14])}px;
`;

export const Bar = styled.View`
  width: ${spacings[9]}px;
  height: 2px;

  align-self: center;

  margin-top: ${spacings[2]}px;

  background-color: ${colors.light.overlay['50p']};
`;

export const CloseButton = styled.TouchableOpacity`
  overflow: hidden;

  justify-content: center;
  align-self: flex-end;
  align-items: flex-end;

  margin-bottom: ${spacings[2]}px;
  margin-right: ${spacings[3]}px;
`;
