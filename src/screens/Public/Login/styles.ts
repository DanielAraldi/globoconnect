import styled from 'styled-components/native';

import { theme } from '../../../config';

const { colors, spacings } = theme;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;

  width: 100%;

  justify-content: center;
  align-items: center;

  padding: ${spacings[4]}px;

  background-color: ${colors.background.main};
`;

export const GreetingContent = styled.View`
  width: 100%;
  height: auto;

  justify-content: center;
  align-items: center;
`;

export const InputContent = styled.View`
  width: 100%;

  margin: ${spacings[5]}px 0;
`;

export const Logo = styled.Image`
  width: ${spacings[14]}px;
  height: ${spacings[14]}px;
`;

export const ButtonContent = styled.View`
  width: 100%;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;

  justify-content: space-between;

  margin: ${spacings[5]}px 0;
`;
