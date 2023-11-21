import { Feather } from '@expo/vector-icons';
import {
  CommonActions,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { Camera as ExpoCamera, VideoQuality } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Else, If, Then, When } from 'react-if';
import { Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';

import {
  Background,
  EmptyMessage,
  GenericButton,
  Header,
  ModalView,
  TextField,
  Video,
} from '../../../components';
import { theme } from '../../../config';
import { usePosts } from '../../../hooks';
import {
  ButtonCameraContent,
  ButtonContent,
  ButtonContentOverlay,
  Camera,
  CameraOverlay,
  Container,
  Content,
  GalleryButton,
  GoBackButton,
  InputContent,
  InputWrapper,
  RecordButton,
  RecordButtonWrapper,
} from './styles';

export function Add() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { isLoadingPosts, createPost } = usePosts();

  const [isOpenModalCamera, setIsOpenModalCamera] = useState<boolean>(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [uri, setUri] = useState<string>('');

  const [permissionCamera] = ExpoCamera.useCameraPermissions();
  const [permissionLibrary] = ImagePicker.useCameraPermissions();

  const cameraRef = useRef<ExpoCamera>(null);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const { spacings, colors } = theme;
  const isDisabledSumbit = !uri || !title;
  const isAllowed = !!permissionCamera?.granted && !!permissionLibrary?.granted;
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

  function clearStates(): void {
    setTitle('');
    setDescription('');
    setUri('');
    setIsOpenModalCamera(false);
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
        quality: VideoQuality['1080p'],
      });

      setUri(uri);
    }

    handleCloseModal();
  }

  async function handleGalleryVideo(): Promise<void> {
    setIsLoadingVideo(true);

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
      setUri(assets[0].uri);
      handleCloseModal();
    }
    setIsLoadingVideo(false);
  }

  async function onSubmit(): Promise<void> {
    const response = await createPost({
      comments: 0,
      liked: false,
      likes: 0,
      title,
      description,
      video: uri,
      user: {
        id: 'd697a33e-6626-4edf-b3e7-f2df27007632',
        avatarUrl: 'https://avatars.githubusercontent.com/u/2254731?v=4',
        nickname: 'diego3g',
      },
    });

    if (response) goToHome();
    clearStates();
  }

  useFocusEffect(
    useCallback(() => {
      handleRequestPermission();
    }, []),
  );

  useEffect(() => {
    if (isOpenModalCamera) fadeAnimation.setValue(1);
  }, [isOpenModalCamera]);

  useEffect(() => {
    if (!isFocused) clearStates();
  }, [isFocused]);

  return (
    <Container>
      <Background>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content>
            <Header variant='only-logo' />

            <InputContent>
              <InputWrapper>
                <TextField
                  value={title}
                  variant='secondary'
                  returnKeyType='next'
                  placeholder='Título'
                  marginBottom={spacings[2]}
                  onChangeText={setTitle}
                  isLoading={isLoadingPosts}
                />

                <TextField
                  value={description}
                  variant='secondary'
                  returnKeyType='done'
                  placeholder='Descrição'
                  marginBottom={spacings[4]}
                  onChangeText={setDescription}
                  isLoading={isLoadingPosts}
                />
              </InputWrapper>

              <When condition={uri}>
                <Video
                  uri={uri}
                  variant='preview'
                  isPaused={isOpenModalCamera}
                />
              </When>
            </InputContent>

            <ButtonContent>
              <ButtonContentOverlay>
                <GenericButton
                  type='primary'
                  text={uri ? 'Mudar de vídeo' : 'Adicionar vídeo'}
                  onPress={() => setIsOpenModalCamera(true)}
                  disabled={isLoadingPosts}
                />

                <GenericButton
                  type='primary'
                  text='Postar'
                  onPress={onSubmit}
                  disabled={isDisabledSumbit}
                  isLoading={isLoadingPosts}
                />
              </ButtonContentOverlay>
            </ButtonContent>
          </Content>
        </TouchableWithoutFeedback>

        <ModalView
          variant='full'
          visible={isOpenModalCamera}
          onRequestClose={handleCloseModal}
        >
          <If condition={isAllowed}>
            <Then>
              <Camera ref={cameraRef}>
                <CameraOverlay isLoading={isLoadingVideo}>
                  <GoBackButton
                    onPress={handleCloseModal}
                    disabled={isLoadingVideo}
                  >
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
                        disabled={isLoadingVideo}
                      />
                    </RecordButtonWrapper>

                    <GalleryButton
                      onPress={handleGalleryVideo}
                      disabled={isLoadingVideo}
                    >
                      <Feather
                        name='image'
                        color={colors.light.main}
                        size={spacings[10]}
                      />
                    </GalleryButton>
                  </ButtonCameraContent>
                </CameraOverlay>
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
    </Container>
  );
}
