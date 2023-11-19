import styled from 'styled-components/native';

import { theme } from '../../config';

const { spacings, colors } = theme;

export const Container = styled.TouchableOpacity`
  width: 50%;
  height: ${spacings[14]}px;

  background-color: ${colors.light.overlay['10p']};
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
