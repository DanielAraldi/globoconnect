import styled from 'styled-components/native';

import { UserPhotoStyleProps } from '../../@types';
import { theme } from '../../config';

const { spacings, colors, borderRadius } = theme;

export const Container = styled.Pressable<UserPhotoStyleProps>`
  width: ${({ variant }) => spacings[variant === 'profile' ? 13 : 9]}px;
  height: ${({ variant }) => spacings[variant === 'profile' ? 13 : 9]}px;

  overflow: hidden;

  border-width: 2px;
  border-color: ${colors.light.main};
  border-radius: ${borderRadius.pill}px;
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;
