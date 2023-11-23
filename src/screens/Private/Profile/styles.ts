import styled from 'styled-components/native';

import { theme } from '../../../config';

const { spacings, colors } = theme;

export const Container = styled.View`
  flex: 1;

  width: 100%;

  padding-bottom: 0;
`;

export const UserContainer = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin-bottom: ${spacings[3]}px;

  padding: ${spacings[4]}px;
  padding-bottom: 0;
`;

export const UserDescriptionWrapper = styled.View`
  width: 100%;

  padding: 0 ${spacings[4]}px;
`;

export const SocialContent = styled.View`
  flex-direction: row;

  justify-content: center;

  margin-left: ${spacings[5]}px;
`;

export const PostHeader = styled.View`
  flex-direction: row;

  width: 100%;
  height: ${spacings[10]}px;

  justify-content: center;
  align-items: center;

  gap: ${spacings[0]}px;

  margin-top: ${spacings[4]}px;

  border-width: 1px;
  border-top-color: ${colors.light.overlay['50p']};
  border-bottom-color: ${colors.light.overlay['50p']};
`;

export const PostContent = styled.View`
  flex: 1;

  width: 100%;
`;

export const LoadContent = styled.View`
  flex: 1;

  justify-content: center;
`;
