import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';

import { ModalViewProps } from '../../@types';
import { theme } from '../../config';
import { Background } from '../Background';
import { Bar, CloseButton, Container, Overlay } from './styles';

export function ModalView(props: ModalViewProps) {
  const { children, onDismiss, ...rest } = props;

  const { spacings, colors } = theme;

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
        <Container>
          <Background>
            <Bar />

            <CloseButton onPress={handleCloseModal}>
              <MaterialCommunityIcons
                name='close-circle'
                size={spacings[6]}
                color={colors.light.main}
              />
            </CloseButton>

            {children}
          </Background>
        </Container>
      </Overlay>
    </Modal>
  );
}
