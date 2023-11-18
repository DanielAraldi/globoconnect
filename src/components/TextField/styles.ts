import styled from 'styled-components/native';

import { TextFieldStyleProps } from '../../@types';
import { theme } from '../../config';

const { spacings, colors, borderRadius, fontFamilies, fontSizes } = theme;

export const Container = styled.View<TextFieldStyleProps>`
  flex-direction: row;

  width: 100%;
  height: ${spacings[12]}px;

  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;

  padding: ${spacings[1]}px ${spacings[3]}px;

  background-color: ${colors.surface};

  border-radius: ${borderRadius.small}px;
  border-color: ${({ isFocused, isDisabled }) => {
    if (isDisabled) return colors.light.overlay['5p'];
    if (isFocused) return colors.light.overlay['50p'];
    return colors.light.overlay['15p'];
  }};
  border-width: 1px;
`;

export const Input = styled.TextInput<Pick<TextFieldStyleProps, 'isDisabled'>>`
  flex: 1;

  width: auto;
  height: 100%;

  font-family: ${fontFamilies.nunitoRegular};
  font-size: ${fontSizes.medium}px;
  color: ${({ isDisabled }) =>
    isDisabled ? colors.light.overlay['50p'] : colors.light.main};
`;

export const IconWrapper = styled.Pressable`
  width: 16px;
  height: 100%;

  justify-content: center;
  align-items: center;

  margin-left: ${spacings[1]}px;

  background-color: ${colors.transparent};
`;
