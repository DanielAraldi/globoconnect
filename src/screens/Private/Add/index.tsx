import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Camera as ExpoCamera } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { PostProps } from '../../../@types';
import {
  Background,
  EmptyMessage,
  GenericButton,
  Header,
  ModalView,
  TextField,
  Typography,
} from '../../../components';
import { theme } from '../../../config';
import {
  ButtonContent,
  Camera,
  Container,
  GoBackButton,
  InputContent,
  RecordButton,
  RecordButtonWrapper,
} from './styles';

export function Add() {
  const [isOpenModalCamera, setIsOpenModalCamera] = useState<boolean>(false);
  const [post, setPost] = useState<PostProps>({} as PostProps);

  const [permission] = ExpoCamera.useCameraPermissions();

  const cameraRef = useRef<ExpoCamera>(null);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const { spacings, colors } = theme;
  const isDisabledSumbit = !post?.video || !post?.title;
  const videoRecordingMessage = post?.video
    ? 'Seu vídeo foi gravado com sucesso! 📷'
    : 'Ei, bora postar um vídeo!';
  const animationStyle = {
    opacity: fadeAnimation,
  };

  function handleCloseModal(): void {
    setIsOpenModalCamera(false);
  }

  async function handleRequestPermission(): Promise<void> {
    await ExpoCamera.requestMicrophonePermissionsAsync();
    await ExpoCamera.requestCameraPermissionsAsync();
  }

  async function handleOnPressOut(): Promise<void> {
    cameraRef.current?.stopRecording();
    handleCloseModal();
  }

  async function handleRecordVideo(): Promise<void> {
    if (cameraRef.current) {
      const ONE_MINUTE = 100000;

      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: ONE_MINUTE,
        useNativeDriver: true,
      }).start();

      const { uri } = await cameraRef.current.recordAsync({
        maxDuration: ONE_MINUTE,
        mute: false,
        quality: '16:9',
      });

      setPost({
        ...post,
        video: uri,
        comments: 0,
        likes: 0,
        shareds: 0,
        liked: false,
      });
    }

    handleCloseModal();
  }

  useFocusEffect(
    useCallback(() => {
      handleRequestPermission();
    }, []),
  );

  useEffect(() => {
    if (isOpenModalCamera) fadeAnimation.setValue(1);
  }, [isOpenModalCamera]);

  return (
    <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header variant='only-logo' />

          <InputContent>
            <TextField
              variant='secondary'
              returnKeyType='next'
              placeholder='Título'
              marginBottom={spacings[4]}
              onChangeText={text => setPost({ ...post, title: text })}
            />
          </InputContent>

          <ButtonContent>
            <Typography
              variant='nunitoRegular'
              fontSize='small'
              textAlign='center'
              text={videoRecordingMessage}
            />

            <GenericButton
              type='primary'
              text='Adicionar vídeo'
              onPress={() => setIsOpenModalCamera(true)}
            />

            <GenericButton
              type='primary'
              text='Postar'
              disabled={isDisabledSumbit}
            />
          </ButtonContent>
        </Container>
      </TouchableWithoutFeedback>

      <ModalView
        variant='full'
        visible={isOpenModalCamera}
        onRequestClose={handleCloseModal}
      >
        <If condition={!!permission?.granted}>
          <Then>
            <Camera ref={cameraRef}>
              <GoBackButton onPress={handleCloseModal}>
                <Feather
                  name='arrow-left'
                  size={spacings[6]}
                  color={colors.light.main}
                />
              </GoBackButton>

              <RecordButtonWrapper style={animationStyle}>
                <RecordButton
                  activeOpacity={0.85}
                  onLongPress={handleRecordVideo}
                  onPressOut={handleOnPressOut}
                />
              </RecordButtonWrapper>
            </Camera>
          </Then>
          <Else>
            <EmptyMessage
              message={
                'Habilite à sua câmera\npara que você possa gravar vídeos'
              }
              variant='camera'
            />
          </Else>
        </If>
      </ModalView>
    </Background>
  );
}
