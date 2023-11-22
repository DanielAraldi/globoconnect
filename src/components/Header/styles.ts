import styled from 'styled-components/native';

import { theme } from '../../config';

const { spacings, colors } = theme;

export const Container = styled.View`
  flex-direction: row;

  width: 100%;
  height: ${spacings[12]}px;

  align-items: center;

  padding: ${spacings[1]}px ${spacings[4]}px;

  background-color: ${colors.background.main};

  border-bottom-color: ${colors.light.main};
  border-width: 1px;
`;

export const TypographyWrapper = styled.View`
  flex: 1;

  margin-right: ${spacings[0]}px;
`;

export const LogoutContent = styled.View`
  width: 100%;

  padding: ${spacings[1]}px ${spacings[4]}px;

  gap: ${spacings[5]}px;
`;
