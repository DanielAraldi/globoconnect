import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { When } from 'react-if';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import { UserLoginProps } from '../../../@types';
import { GenericButton, TextField, Typography } from '../../../components';
import { LOGO, theme } from '../../../config';
import {
  ButtonContent,
  ButtonWrapper,
  Container,
  Content,
  GreetingContent,
  InputContent,
  Logo,
} from './styles';

export function Login() {
  const navigation = useNavigation();

  const [user, setUser] = useState({} as UserLoginProps);

  const { spacings } = theme;
  const isIos = Platform.OS === 'ios';

  function goToHome(): void {
    navigation.navigate('PrivateRoutes' as never);
  }

  function onSubmit(): void {
    if (user.email && user.password) goToHome();
  }

  return (
    <Container behavior={isIos ? 'padding' : 'height'}>
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
              variant='email'
              returnKeyType='next'
              placeholder='Email'
              onChangeText={text => setUser({ ...user, email: text })}
            />

            <TextField
              variant='password'
              marginTop={spacings[3]}
              returnKeyType='go'
              placeholder='Senha'
              onChangeText={text => setUser({ ...user, password: text })}
              onSubmitEditing={onSubmit}
            />
          </InputContent>

          <ButtonContent>
            <Typography
              text={'Não tem conta?\nCadastre-se agora com'}
              textAlign='center'
            />

            <ButtonWrapper>
              <GenericButton
                type='auth'
                socialIcon='google'
                hugWidth={!isIos}
              />

              <When condition={isIos}>
                <GenericButton type='auth' socialIcon='apple' />
              </When>
            </ButtonWrapper>

            <GenericButton type='primary' text='Entrar' onPress={onSubmit} />
          </ButtonContent>
        </Content>
      </TouchableWithoutFeedback>
    </Container>
  );
}
