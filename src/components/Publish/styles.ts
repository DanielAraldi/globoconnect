import { Video } from 'expo-av';
import styled, { css } from 'styled-components/native';

import { PublishStyleProps } from '../../@types';
import { theme } from '../../config';

const { spacings, colors } = theme;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex-grow: 1;

  width: 100%;
`;

export const UserBar = styled.View`
  flex-direction: row;

  align-items: center;

  padding: ${spacings[1]}px ${spacings[4]}px;

  border-top-width: 1px;
  border-top-color: ${colors.light.main};
`;

export const Username = styled.View`
  flex-direction: row;
  flex: 1;

  align-items: center;

  margin-right: ${spacings[1]}px;

  gap: ${spacings[1]}px;
`;

export const PostVideoWrapper = styled.View<PublishStyleProps>`
  width: 100%;
  height: ${spacings[15] * 2}px;

  ${({ variant }) =>
    variant === 'unique' &&
    css`
      margin-bottom: ${spacings[4]}px;
    `}

  background-color: ${colors.light.overlay['10p']};
`;

export const PostVideo = styled(Video)`
  width: 100%;
  height: 100%;
`;

export const PostBar = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  gap: ${spacings[1]}px;

  margin-bottom: ${spacings[3]}px;

  padding: ${spacings[1]}px ${spacings[4]}px;

  border-bottom-width: 1px;
  border-bottom-color: ${colors.light.main};
`;
