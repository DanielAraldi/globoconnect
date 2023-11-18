import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import { GenericButton, TextField, Typography } from '../../components';
import { LOGO, theme } from '../../config';
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
  const { spacings } = theme;

  const isIos = Platform.OS === 'ios';

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
            <TextField variant='email' returnKeyType='next' />

            <TextField
              variant='password'
              marginTop={spacings[3]}
              returnKeyType='go'
            />
          </InputContent>

          <ButtonContent>
            <Typography
              text={'Não tem conta?\nCadastre-se agora com'}
              textAlign='center'
            />

            <ButtonWrapper>
              <GenericButton type='auth' socialIcon='google' />

              <GenericButton type='auth' socialIcon='apple' />
            </ButtonWrapper>

            <GenericButton type='primary' text='Logar' />
          </ButtonContent>
        </Content>
      </TouchableWithoutFeedback>
    </Container>
  );
}
