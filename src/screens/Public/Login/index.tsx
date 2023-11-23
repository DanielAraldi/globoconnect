import { useState } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import Toast from 'react-native-toast-message';

import { UserLoginProps, UserProps } from '../../../@types';
import {
  Background,
  GenericButton,
  TextField,
  Typography,
} from '../../../components';
import { LOGO, theme } from '../../../config';
import { useAuth, usePosts } from '../../../hooks';
import { Storage } from '../../../libs';
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
  const { loadAllPosts, loadPostByUserId } = usePosts();

  const [userCredentils, setUserCredentials] = useState({} as UserLoginProps);

  const { spacings } = theme;
  const isIos = Platform.OS === 'ios';
  const canSumbmit = userCredentils.email && userCredentils.password;

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
      const isLogged = await signIn(userCredentils);
      const userData = await Storage.get<UserProps>('user');
      await loadPostByUserId(userData?.id || '', 'owner');
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
                onChangeText={text =>
                  setUserCredentials({ ...userCredentils, email: text })
                }
                isLoading={isLoadingAuth}
              />

              <TextField
                type='password'
                marginTop={spacings[3]}
                returnKeyType='send'
                placeholder='Senha'
                onChangeText={text =>
                  setUserCredentials({ ...userCredentils, password: text })
                }
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
