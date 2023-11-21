import { PropsWithChildren } from 'react';
import { ModalProps } from 'react-native';

export type ModalViewVariant = 'normal' | 'full' | 'logout';

export interface ModalViewStyleProps {
  variant: 'normal' | 'full' | 'logout';
}

export interface ModalViewProps extends PropsWithChildren<ModalProps> {
  variant?: 'normal' | 'full' | 'logout';
}
