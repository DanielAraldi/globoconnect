import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

import { GenericButtonStyleProps } from '../../@types';
import { theme } from '../../config';

const { spacings, borderRadius, colors } = theme;

export const Container = styled.TouchableOpacity<GenericButtonStyleProps>`
  ${({ type }) =>
    type === 'auth'
      ? css`
          min-width: 48%;
        `
      : css`
          width: 100%;
        `}
  height: ${spacings[12]}px;

  padding: ${spacings[1]}px;

  justify-content: center;
  align-items: center;

  background-color: ${colors.surface};

  border-radius: ${borderRadius.small}px;
`;

export const StyleLine = (isDisabled?: boolean) =>
  StyleSheet.create({
    container: {
      borderColor: colors.light.overlay[isDisabled ? '5p' : '15p'],
      borderWidth: 1,
    },
  });
