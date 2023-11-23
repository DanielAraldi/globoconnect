import styled, { css } from 'styled-components/native';

import { UserCommentStyleProps } from '../../@types';
import { theme } from '../../config';

const { spacings } = theme;

export const Container = styled.View<UserCommentStyleProps>`
  width: 100%;

  ${({ variant }) =>
    variant === 'owner' &&
    css`
      margin-bottom: ${spacings[3]}px;
    `}

  padding: ${({ variant }) => (variant === 'owner' ? 0 : spacings[2])}px
    ${({ variant }) => spacings[variant === 'owner' ? 4 : 1]}px;

  gap: ${({ variant }) => spacings[variant === 'owner' ? 1 : 0]}px;
`;
