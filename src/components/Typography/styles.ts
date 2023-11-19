import styled from 'styled-components/native';

import { TypographyStyleProps } from '../../@types';
import { theme } from '../../config';

export const Text = styled.Text<TypographyStyleProps>`
  font-family: ${({ variant }) => theme.fontFamilies[variant]};
  font-size: ${({ fontSize }) => theme.fontSizes[fontSize]}px;
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ color }) => color};
`;
