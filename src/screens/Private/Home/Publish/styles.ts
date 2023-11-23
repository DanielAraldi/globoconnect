import styled from 'styled-components/native';

import { theme } from '../../../../config';

const { spacings, colors } = theme;

export const Container = styled.KeyboardAvoidingView`
  width: 100%;
`;

export const InteractionBar = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  gap: ${spacings[1]}px;

  margin-bottom: ${spacings[3]}px;

  padding: ${spacings[1]}px ${spacings[4]}px;

  border-bottom-width: 1px;
  border-bottom-color: ${colors.light.main};
`;
