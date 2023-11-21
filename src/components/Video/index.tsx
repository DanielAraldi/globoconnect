import { AVPlaybackStatus, ResizeMode, Video as ExpoAV } from 'expo-av';
import { useEffect, useRef } from 'react';

import { VideoProps } from '../../@types';
import { Container } from './styles';

export function Video(props: VideoProps) {
  const { uri, variant = 'post', isPaused = false } = props;

  const videoRef = useRef<ExpoAV>(null);

  async function handleLoopVideo(status: AVPlaybackStatus): Promise<void> {
    if (status.isLoaded && videoRef.current) {
      await videoRef.current.setIsLoopingAsync(true);
    }
  }

  async function handlePlayVideo(): Promise<void> {
    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  }

  async function handlePauseVideo(): Promise<void> {
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
    }
  }

  useEffect(() => {
    if (isPaused) handlePauseVideo();
    else handlePlayVideo();
  }, [isPaused]);

  return (
    <Container
      variant={variant}
      ref={videoRef}
      source={{ uri }}
      resizeMode={ResizeMode.COVER}
      useNativeControls={false}
      shouldPlay
      onLoad={handleLoopVideo}
    />
  );
}
