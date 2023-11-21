import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../../config';

const { colors, spacings } = theme;

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;

  width: 100%;
  height: 100%;
`;

export const ListDivider = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${colors.light.main};
`;

export const ModalContent = styled.View`
  flex: 1;

  padding: ${spacings[2]}px ${spacings[4]}px ${spacings[9]}px;
`;

export const CenterWrapper = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
