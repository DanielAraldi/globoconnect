import styled from 'styled-components/native';

import { theme } from '../../config';

const { spacings } = theme;

export const Container = styled.Pressable`
  flex: 1;

  width: 100%;

  justify-content: center;
  align-items: center;

  gap: ${spacings[2]}px;
`;
