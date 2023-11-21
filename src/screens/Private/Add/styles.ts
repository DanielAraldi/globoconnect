import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { Animated, Platform } from 'react-native';
import styled from 'styled-components/native';

import { CameraOverlayStyleProps } from '../../../@types';
import { theme } from '../../../config';
import { getStatusBarHeight } from '../../../utils';

const { spacings, colors, borderRadius } = theme;

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;

  width: 100%;
`;

export const InputContent = styled.View`
  width: 100%;
`;

export const InputWrapper = styled.View`
  padding: ${spacings[4]}px ${spacings[4]}px 0;
`;

export const ButtonContent = styled.View`
  flex: 1;

  width: 100%;

  justify-content: flex-end;
`;

export const ButtonContentOverlay = styled.View`
  width: 100%;

  padding: ${spacings[4]}px;

  gap: ${spacings[2]}px;

  background-color: ${colors.background.main};
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
`;

export const CameraOverlay = styled.View<CameraOverlayStyleProps>`
  width: 100%;
  height: 100%;

  padding: ${spacings[4]}px;
  padding-bottom: ${spacings[12]}px;

  justify-content: flex-end;
  align-items: center;

  background-color: ${({ isLoading }) =>
    isLoading ? colors.background.overlay['50p'] : colors.transparent};
`;

export const GoBackButton = styled.Pressable`
  position: absolute;

  top: ${getStatusBarHeight() + spacings[8]}px;
  left: ${spacings[4]}px;
`;

export const ButtonCameraContent = styled.View`
  flex-direction: row;

  width: 100%;

  justify-content: center;
  align-items: center;
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

export const GalleryButton = styled.Pressable`
  position: absolute;
  right: ${spacings[0]}px;

  width: ${spacings[10]}px;
  height: ${spacings[10]}px;

  justify-content: center;
  align-items: center;
`;
