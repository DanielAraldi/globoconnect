import styled from 'styled-components/native';

import { theme } from '../../config';

const { spacings } = theme;

export const Container = styled.View`
  width: 100%;

  gap: ${spacings[0]}px;

  padding: ${spacings[2]}px ${spacings[4]}px;
`;
