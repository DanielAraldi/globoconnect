import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../../config';
import { getStatusBarHeight } from '../../../utils';

const { spacings, colors, borderRadius } = theme;

export const Container = styled.View`
  flex: 1;

  width: 100%;
`;

export const InputContent = styled.View`
  flex: 1;

  width: 100%;

  justify-content: flex-start;

  padding: ${spacings[4]}px;
`;

export const ButtonContent = styled.View`
  flex: 1;

  width: 100%;

  justify-content: flex-end;

  padding: ${spacings[4]}px;

  gap: ${spacings[4]}px;
`;

export const CameraContent = styled.View`
  flex: 1;

  width: 100%;

  justify-content: center;
  align-items: center;
`;

export const Camera = styled(ExpoCamera).attrs({
  type: CameraType.back,
})`
  flex: 1;

  width: 100%;
  height: 100%;

  padding: ${spacings[4]}px;
  padding-bottom: ${spacings[12]}px;

  justify-content: flex-end;
  align-items: center;
`;

export const GoBackButton = styled.Pressable`
  position: absolute;

  top: ${getStatusBarHeight() + spacings[8]}px;
  left: ${spacings[4]}px;
`;

export const RecordButtonWrapper = styled(Animated.View)`
  width: ${spacings[12] + spacings[4]}px;
  height: ${spacings[12] + spacings[4]}px;

  border-radius: ${borderRadius.pill}px;
  border-color: ${colors.light.main};
  border-width: 4px;

  background-color: ${colors.primary};
`;

export const RecordButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;
