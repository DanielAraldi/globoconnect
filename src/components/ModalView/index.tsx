import { MaterialCommunityIcons } from '@expo/vector-icons';
import { When } from 'react-if';
import { Modal } from 'react-native';

import { ModalViewProps } from '../../@types';
import { theme } from '../../config';
import { Background } from '../Background';
import { Bar, CloseButton, Container, Overlay } from './styles';

export function ModalView(props: ModalViewProps) {
  const {
    variant = 'normal',
    isDisabledClose = false,
    children,
    onDismiss,
    ...rest
  } = props;

  const { spacings, colors } = theme;

  const iconColor = isDisabledClose
    ? colors.light.overlay['15p']
    : colors.primary;

  function handleCloseModal(): void {
    if (onDismiss) return onDismiss();
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType='slide'
      onDismiss={handleCloseModal}
      {...rest}
    >
      <Overlay>
        <Container variant={variant}>
          <Background>
            <When condition={variant !== 'full'}>
              <Bar />

              <CloseButton
                onPress={handleCloseModal}
                disabled={isDisabledClose}
              >
                <MaterialCommunityIcons
                  name='close-circle'
                  size={spacings[6]}
                  color={iconColor}
                />
              </CloseButton>
            </When>

            {children}
          </Background>
        </Container>
      </Overlay>
    </Modal>
  );
}
