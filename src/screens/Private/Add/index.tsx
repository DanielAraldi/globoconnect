import { Feather } from '@expo/vector-icons';
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { Camera as ExpoCamera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';

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
import { PostService } from '../../../services';
import {
  ButtonCameraContent,
  ButtonContent,
  Camera,
  Container,
  GalleryButton,
  GoBackButton,
  InputContent,
  RecordButton,
  RecordButtonWrapper,
} from './styles';

export function Add() {
  const navigation = useNavigation();

  const [isOpenModalCamera, setIsOpenModalCamera] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [videoUri, setVideoUri] = useState<string>('');

  const [permissionCamera] = ExpoCamera.useCameraPermissions();
  const [permissionLibrary] = ImagePicker.useCameraPermissions();

  const cameraRef = useRef<ExpoCamera>(null);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const { spacings, colors } = theme;
  const isDisabledSumbit = !videoUri || !title;
  const isAllowed = !!permissionCamera?.granted && !!permissionLibrary?.granted;
  const videoRecordingMessage = videoUri
    ? 'Seu vídeo foi gravado com sucesso! 📷'
    : 'Ei, bora postar um vídeo!';
  const animationStyle = {
    opacity: fadeAnimation,
  };

  function handleCloseModal(): void {
    setIsOpenModalCamera(false);
  }

  function goToHome(): void {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      }),
    );
  }

  async function handleRequestPermission(): Promise<void> {
    await ExpoCamera.requestMicrophonePermissionsAsync();
    await ExpoCamera.requestCameraPermissionsAsync();
    await ImagePicker.getMediaLibraryPermissionsAsync();
  }

  async function handleOnPressOut(): Promise<void> {
    cameraRef.current?.stopRecording();
    handleCloseModal();
  }

  async function handleRecordVideo(): Promise<void> {
    if (cameraRef.current) {
      const ONE_MINUTE = 100_000;

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

      setVideoUri(uri);
    }

    handleCloseModal();
  }

  async function handleGalleryVideo(): Promise<void> {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      selectionLimit: 1,
      videoMaxDuration: 60,
      allowsEditing: true,
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
    });

    if (!canceled && assets) {
      const [asset] = assets;
      setVideoUri(asset.uri);
      handleCloseModal();
    }
  }

  async function onSubmit(): Promise<void> {
    setIsLoading(true);
    const response = await PostService.create({
      comments: 0,
      liked: false,
      likes: 0,
      title,
      video: videoUri,
      user: {
        id: 'd697a33e-6626-4edf-b3e7-f2df27007632',
        avatarUrl: 'https://avatars.githubusercontent.com/u/2254731?v=4',
        nickname: 'diego3g',
      },
    });

    if (response) goToHome();
    setTitle('');
    setVideoUri('');
    setIsLoading(false);
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
              value={title}
              variant='secondary'
              returnKeyType='next'
              placeholder='Título'
              marginBottom={spacings[4]}
              onChangeText={setTitle}
              isLoading={isLoading}
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
              disabled={isLoading}
            />

            <GenericButton
              type='primary'
              text='Postar'
              onPress={onSubmit}
              disabled={isDisabledSumbit}
              isLoading={isLoading}
            />
          </ButtonContent>
        </Container>
      </TouchableWithoutFeedback>

      <ModalView
        variant='full'
        visible={isOpenModalCamera}
        onRequestClose={handleCloseModal}
      >
        <If condition={isAllowed}>
          <Then>
            <Camera ref={cameraRef}>
              <GoBackButton onPress={handleCloseModal}>
                <Feather
                  name='arrow-left'
                  size={spacings[6]}
                  color={colors.light.main}
                />
              </GoBackButton>

              <ButtonCameraContent>
                <RecordButtonWrapper style={animationStyle}>
                  <RecordButton
                    activeOpacity={0.85}
                    onLongPress={handleRecordVideo}
                    onPressOut={handleOnPressOut}
                  />
                </RecordButtonWrapper>

                <GalleryButton onPress={handleGalleryVideo}>
                  <Feather
                    name='image'
                    color={colors.light.main}
                    size={spacings[10]}
                  />
                </GalleryButton>
              </ButtonCameraContent>
            </Camera>
          </Then>
          <Else>
            <EmptyMessage
              variant='camera'
              message={
                'Habilite à sua câmera e o acesso à\ngaleria para que você possa gravar vídeos'
              }
            />
          </Else>
        </If>
      </ModalView>
    </Background>
  );
}
