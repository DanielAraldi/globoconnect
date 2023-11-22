import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { When } from 'react-if';
import { TouchableOpacity } from 'react-native';

import { HeaderProps } from '../../@types';
import { theme } from '../../config';
import { useAuth } from '../../hooks';
import { GenericButton } from '../GenericButton';
import { ModalView } from '../ModalView';
import { Typography } from '../Typography';
import { Container, LogoutContent, TypographyWrapper } from './styles';

export function Header(props: HeaderProps) {
  const { variant, nickname = 'usuario' } = props;

  const navigation = useNavigation();
  const { isLoadingAuth, signOut } = useAuth();

  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);

  const { colors, spacings } = theme;
  const isProfile = variant === 'profile';

  function handleCloseModal(): void {
    setIsLogoutModal(false);
  }

  function onPressIcon(): void {
    if (isProfile) navigation.navigate('Add' as never);
    else setIsLogoutModal(true);
  }

  async function handleSignOut(): Promise<void> {
    await signOut();
    setIsLogoutModal(false);
  }

  return (
    <>
      <Container>
        <TypographyWrapper>
          <Typography
            text={isProfile ? `@${nickname}` : 'GloboConnect'}
            variant={isProfile ? 'nunitoBold' : 'nunitoSemiBold'}
            fontSize='large'
            ellipsizeMode='tail'
            numberOfLines={1}
          />
        </TypographyWrapper>

        <When condition={variant !== 'only-logo'}>
          <TouchableOpacity activeOpacity={0.85} onPress={onPressIcon}>
            <Feather
              name={isProfile ? 'plus-circle' : 'log-out'}
              size={spacings[5]}
              color={colors.light.main}
            />
          </TouchableOpacity>
        </When>
      </Container>

      <ModalView
        variant='logout'
        visible={isLogoutModal}
        onDismiss={handleCloseModal}
        onRequestClose={handleCloseModal}
        isDisabledClose={isLoadingAuth}
      >
        <LogoutContent>
          <Typography
            text='Você tem certeza que deseja sair?'
            textAlign='center'
            fontSize='medium'
            variant='nunitoBold'
            color={colors.primary}
          />

          <GenericButton
            text='Sim!'
            onPress={handleSignOut}
            isLoading={isLoadingAuth}
          />
        </LogoutContent>
      </ModalView>
    </>
  );
}
