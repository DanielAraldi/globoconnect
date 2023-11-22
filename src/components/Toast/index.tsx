import ToastMessage, { ToastConfig } from 'react-native-toast-message';

import { theme } from '../../config';
import { getStatusBarHeight } from '../../utils';
import { Container } from './styles';

export type ToastType = 'success' | 'error';

export interface ToastStyleProps {
  type: ToastType;
}

export function Toast() {
  const { spacings } = theme;

  const toastConfig: ToastConfig = {
    success: ({ text1, text2, type, ...rest }) => (
      <Container
        type={type as ToastType}
        text1={text1}
        text2={text2}
        {...rest}
      />
    ),
    error: ({ text1, text2, type, ...rest }) => (
      <Container
        type={type as ToastType}
        text1={text1}
        text2={text2}
        {...rest}
      />
    ),
  };

  const topOffset = getStatusBarHeight() + spacings[9];

  return (
    <ToastMessage
      visibilityTime={5000}
      topOffset={topOffset}
      config={toastConfig}
    />
  );
}
