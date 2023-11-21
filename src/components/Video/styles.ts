import { Video } from 'expo-av';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { VideoStyleProps } from '../../@types';
import { theme } from '../../config';

const { spacings } = theme;

export const Container = styled(Video)<VideoStyleProps>`
  width: 100%;
  height: ${({ variant }) =>
    variant === 'post'
      ? spacings[15] * 2
      : Dimensions.get('window').height * 0.4}px;
`;
