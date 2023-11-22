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
import Toast from 'react-native-toast-message';

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
import { useAuth, usePosts } from '../../../hooks';
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
  const { user } = useAuth();
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

  const isDisabledSumbit = !uri || !title.trim() || !description.trim();
  const isAllowed = !!permissionCamera?.granted && !!permissionLibrary?.granted;
  const animationStyle = {
    opacity: fadeAnimation,
  };

  function handleCloseModal(): void {
    setIsOpenModalCamera(false);
  }

  function showToast(title: string, message: string): void {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
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

  function handleOpenCamera(): void {
    Keyboard.dismiss();
    setIsOpenModalCamera(true);
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
    try {
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
    } catch (error) {
      showToast(
        'Ei connector!',
        'Certifique-se que as permissões para o acesso a câmera estão habilitadas.',
      );
    } finally {
      handleCloseModal();
    }
  }

  async function handleGalleryVideo(): Promise<void> {
    setIsLoadingVideo(true);

    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        selectionLimit: 1,
        videoMaxDuration: 60,
        allowsEditing: true,
        allowsMultipleSelection: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
        presentationStyle:
          ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
      });

      if (!canceled && assets) {
        setUri(assets[0].uri);
        handleCloseModal();
      }
    } catch (error) {
      showToast(
        'Ei connector!',
        'Certifique-se que as permissões para o acesso a galeria estão habilitadas.',
      );
    } finally {
      setIsLoadingVideo(false);
    }
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
        id: user.id,
        avatarUrl: user.avatarUrl,
        nickname: user.nickname,
        name: user.name,
      },
    });

    if (response) {
      goToHome();
      clearStates();
    } else {
      showToast(
        'Puxa vida, não conseguimos postar',
        'Certifique-se que você está com uma conexão estável de internet e tente novamente.',
      );
    }
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
                  text={uri ? 'Mudar de vídeo' : 'Adicionar vídeo'}
                  onPress={handleOpenCamera}
                  disabled={isLoadingPosts}
                />

                <GenericButton
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
