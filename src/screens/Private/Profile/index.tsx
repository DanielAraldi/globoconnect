import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Background, Header, Typography, UserPhoto } from '../../../components';
import { theme } from '../../../config';
import { Container, PostHeader, SocialContent, UserContainer } from './styles';

export function Profile() {
  const { colors, spacings } = theme;

  function handleValueDigits(value: string): string {
    return (
      {
        4: value[0],
        5: value.slice(0, 2),
        6: value.slice(0, 3),
        7: value[0],
        8: value.slice(0, 2),
        9: value.slice(0, 3),
      }[value.length] || value
    );
  }

  function handleQuantityOfValues(value: number): string {
    const valueAsString = value.toString();
    const amountDigits = valueAsString.length;
    const digits = handleValueDigits(valueAsString);

    if (amountDigits <= 3) return valueAsString;

    return `${digits}${amountDigits < 7 ? 'mil' : 'mi'}`;
  }

  return (
    <Background>
      <Header variant='profile' />

      <Container>
        <UserContainer>
          <UserPhoto variant='profile' />

          <SocialContent>
            <View>
              <Typography
                text={handleQuantityOfValues(1)}
                variant='nunitoRegular'
                textAlign='center'
                fontSize='medium'
              />

              <Typography
                text='Publicações'
                variant='nunitoRegular'
                textAlign='center'
                fontSize='small'
              />
            </View>
          </SocialContent>

          <SocialContent>
            <View>
              <Typography
                text={handleQuantityOfValues(25434)}
                variant='nunitoRegular'
                textAlign='center'
                fontSize='medium'
              />

              <Typography
                text='Seguidores'
                variant='nunitoRegular'
                textAlign='center'
                fontSize='small'
              />
            </View>
          </SocialContent>

          <SocialContent>
            <View>
              <Typography
                text={handleQuantityOfValues(180)}
                variant='nunitoRegular'
                textAlign='center'
                fontSize='medium'
              />

              <Typography
                text='Seguindo'
                variant='nunitoRegular'
                textAlign='center'
                fontSize='small'
              />
            </View>
          </SocialContent>
        </UserContainer>

        <Typography
          text='Diego 3g'
          variant='nunitoRegular'
          textAlign='left'
          fontSize='medium'
          isCapitalized
        />

        <PostHeader>
          <MaterialCommunityIcons
            name='post-outline'
            color={colors.light.main}
            size={spacings[3]}
          />

          <Typography
            text='Publicações'
            variant='nunitoRegular'
            textAlign='center'
            fontSize='medium'
          />
        </PostHeader>
      </Container>
    </Background>
  );
}
