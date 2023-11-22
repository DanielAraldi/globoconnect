import { useState } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import Toast from 'react-native-toast-message';

import { UserLoginProps } from '../../../@types';
import {
  Background,
  GenericButton,
  TextField,
  Typography,
} from '../../../components';
import { LOGO, theme } from '../../../config';
import { useAuth, usePosts } from '../../../hooks';
import {
  ButtonContent,
  Container,
  Content,
  GreetingContent,
  InputContent,
  Logo,
} from './styles';

export function Login() {
  const { signIn, isLoadingAuth } = useAuth();
  const { loadAllPosts } = usePosts();

  const [user, setUser] = useState({} as UserLoginProps);

  const { spacings } = theme;
  const isIos = Platform.OS === 'ios';
  const canSumbmit = user.email && user.password;

  function showToast(title: string, message: string): void {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  }

  async function onSubmit(): Promise<void> {
    if (canSumbmit) {
      await loadAllPosts();
      const isLogged = await signIn(user);
      if (!isLogged) {
        showToast(
          'Puxa vida, não conseguimos conectar',
          'Certifique-se que os dados inseridos estão corretos e tente novamente.',
        );
      }
    }
  }

  return (
    <Container behavior={isIos ? 'padding' : 'height'}>
      <Background>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content>
            <GreetingContent>
              <Logo source={LOGO} />

              <Typography
                text={'Conecte-se com o mundo\ne explore sensações'}
                textAlign='center'
              />
            </GreetingContent>

            <InputContent>
              <TextField
                type='email'
                returnKeyType='next'
                placeholder='Email'
                onChangeText={text => setUser({ ...user, email: text })}
                isLoading={isLoadingAuth}
              />

              <TextField
                type='password'
                marginTop={spacings[3]}
                returnKeyType='send'
                placeholder='Senha'
                onChangeText={text => setUser({ ...user, password: text })}
                onSubmitEditing={onSubmit}
                isLoading={isLoadingAuth}
              />
            </InputContent>

            <ButtonContent>
              <GenericButton
                text='Entrar'
                onPress={onSubmit}
                disabled={!canSumbmit}
                isLoading={isLoadingAuth}
              />
            </ButtonContent>
          </Content>
        </TouchableWithoutFeedback>
      </Background>
    </Container>
  );
}
