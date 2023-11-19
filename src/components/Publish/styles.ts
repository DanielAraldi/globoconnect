import { Video } from 'expo-av';
import styled from 'styled-components/native';

import { theme } from '../../config';

const { spacings, colors } = theme;

export const Container = styled.ScrollView`
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

export const PostVideo = styled(Video)`
  width: 100%;
  height: ${spacings[15] * 2}px;
`;

export const PostBar = styled.View`
  flex-direction: row;

  align-items: center;

  gap: ${spacings[1]}px;

  padding: ${spacings[1]}px ${spacings[4]}px;

  border-bottom-width: 1px;
  border-bottom-color: ${colors.light.main};
`;
