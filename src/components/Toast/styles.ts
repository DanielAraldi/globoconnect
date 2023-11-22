import { Dimensions } from 'react-native';
import { BaseToast } from 'react-native-toast-message';
import styled from 'styled-components/native';

import { theme } from '../../config';
import { ToastStyleProps } from '.';

const { spacings, colors, fontSizes, fontFamilies } = theme;

export const Container = styled(BaseToast).attrs({
  text1NumberOfLines: 2,
  text2NumberOfLines: 2,
  text1Style: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.nunitoSemiBold,
    color: colors.light.main,
  },
  text2Style: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.nunitoRegular,
    color: colors.light.main,
  },
})<ToastStyleProps>`
  width: ${Dimensions.get('window').width - spacings[9]}px;
  height: ${spacings[12] + spacings[4]}px;

  background-color: ${({ type }) =>
    type === 'success' ? colors.surface : colors.error};
`;
