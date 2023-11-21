import styled, { css } from 'styled-components/native';

import { PostTemplateStyleProps } from '../../@types';
import { theme } from '../../config';

const { spacings, colors } = theme;

export const Container = styled.View`
  width: 100%;
`;

export const BarContent = styled.View<PostTemplateStyleProps>`
  flex-direction: row;

  align-items: center;

  padding: ${spacings[1]}px ${spacings[4]}px;

  ${({ variant }) =>
    variant === 'profile' &&
    css`
      border-top-width: 1px;
      border-top-color: ${colors.light.main};
    `}
`;

export const BarWrapper = styled.View`
  flex-direction: row;
  flex: 1;

  align-items: center;

  margin-right: ${spacings[1]}px;

  gap: ${spacings[1]}px;
`;

export const VideoWrapper = styled.View<PostTemplateStyleProps>`
  width: 100%;
  height: ${spacings[15] * 2}px;

  ${({ variant }) =>
    variant === 'profile' &&
    css`
      margin-bottom: ${spacings[3]}px;
    `}

  background-color: ${colors.light.overlay['10p']};
`;
