import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { When } from 'react-if';
import { TouchableOpacity } from 'react-native';

import { HeaderProps } from '../../@types';
import { theme } from '../../config';
import { Typography } from '../Typography';
import { Container, TypographyWrapper } from './styles';

export function Header({ variant }: HeaderProps) {
  const navigation = useNavigation();

  const { colors, spacings } = theme;

  const isProfile = variant === 'profile';

  function goToAddVideo(): void {
    navigation.navigate('Add' as never);
  }

  return (
    <Container>
      <TypographyWrapper>
        <Typography
          text={isProfile ? '@diego3g' : 'GloboConnect'}
          variant={isProfile ? 'nunitoBold' : 'nunitoSemiBold'}
          fontSize='large'
          ellipsizeMode='tail'
          numberOfLines={1}
        />
      </TypographyWrapper>

      <When condition={isProfile}>
        <TouchableOpacity activeOpacity={0.85} onPress={goToAddVideo}>
          <Feather
            name='plus-circle'
            size={spacings[5]}
            color={colors.light.main}
          />
        </TouchableOpacity>
      </When>
    </Container>
  );
}
