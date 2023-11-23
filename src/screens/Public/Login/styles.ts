import styled from 'styled-components/native';

import { theme } from '../../../config';

const { spacings } = theme;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;

  width: 100%;

  justify-content: center;
  align-items: center;

  padding: ${spacings[4]}px;
`;

export const GreetingContent = styled.View`
  width: 100%;
  height: auto;

  justify-content: center;
  align-items: center;

  padding-top: ${spacings[12]}px;
`;

export const InputContent = styled.View`
  flex: 1;

  width: 100%;

  margin: ${spacings[5]}px 0;
`;

export const Logo = styled.Image`
  width: ${spacings[14]}px;
  height: ${spacings[14]}px;
`;

export const ButtonContent = styled.View`
  width: 100%;

  margin-top: ${spacings[10]}px;
`;
