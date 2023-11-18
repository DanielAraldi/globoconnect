import styled from 'styled-components/native';

import { theme } from '../../config';

const { colors } = theme;

export const Container = styled.View`
  flex: 1;

  background-color: ${colors.background.main};
`;
