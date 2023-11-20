import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { When } from 'react-if';

import { TextFieldProps } from '../../@types';
import { theme } from '../../config';
import { Container, IconWrapper, Input } from './styles';

export function TextField(props: TextFieldProps) {
  const { colors } = theme;

  const {
    variant = 'primary',
    type = 'text',
    isLoading = false,
    editable = true,
    marginBottom,
    marginTop,
    ...rest
  } = props;

  const isPassword = type === 'password';

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSecureText, setIsSecureText] = useState<boolean>(isPassword);

  const isEditable = editable || !isLoading;
  const keyboardType = type === 'email' ? 'email-address' : 'default';

  function handleIconColor(): string {
    if (!isEditable) return colors.light.overlay['50p'];
    if (!isFocused) return colors.light.overlay['15p'];
    return colors.light.main;
  }

  const iconColor = handleIconColor();

  function onFocus(): void {
    setIsFocused(true);
  }

  function onBlur(): void {
    setIsFocused(false);
  }

  function onChangeSecureText(): void {
    setIsSecureText(!isSecureText);
  }

  return (
    <Container
      variant={variant}
      isFocused={isFocused}
      isDisabled={!isEditable}
      marginBottom={marginBottom}
      marginTop={marginTop}
    >
      <Input
        isDisabled={!isEditable}
        keyboardType={keyboardType}
        keyboardAppearance='dark'
        editable={isEditable}
        onFocus={onFocus}
        onBlur={onBlur}
        cursorColor={colors.light.main}
        selectionColor={colors.light.main}
        placeholderTextColor={colors.light.overlay['15p']}
        secureTextEntry={isSecureText}
        {...rest}
      />

      <When condition={isPassword}>
        <IconWrapper onPress={onChangeSecureText}>
          <Feather
            name={isSecureText ? 'eye' : 'eye-off'}
            color={iconColor}
            size={16}
          />
        </IconWrapper>
      </When>
    </Container>
  );
}
