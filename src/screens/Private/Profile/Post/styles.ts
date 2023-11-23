import styled from 'styled-components/native';

import { theme } from '../../../../config';

const { spacings } = theme;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex-grow: 1;

  width: 100%;
`;

export const CommentWrapper = styled.View`
  width: 100%;

  padding: 0 ${spacings[2]}px;
`;
