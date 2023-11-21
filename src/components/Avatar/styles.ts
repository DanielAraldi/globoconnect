import styled from 'styled-components/native';

import { AvatarProps } from '../../@types';
import { theme } from '../../config';

const { spacings, colors, borderRadius } = theme;

export const Container = styled.Pressable<AvatarProps>`
  width: ${({ variant }) => spacings[variant === 'profile' ? 13 : 9]}px;
  height: ${({ variant }) => spacings[variant === 'profile' ? 13 : 9]}px;

  overflow: hidden;

  border-width: 2px;
  border-color: ${colors.light.main};
  border-radius: ${borderRadius.pill}px;

  background-color: ${colors.light.overlay['10p']};
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;
