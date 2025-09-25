import { Ionicons } from '@expo/vector-icons'
import { View } from 'moti'
import React, { useRef, useState } from 'react'
import { Image, Pressable, TouchableOpacity } from 'react-native'
import Video from 'react-native-video'

interface IVideoMedia {
  uri: string
  thumbnail?: string
  isVisible?: boolean
}

export const VideoMedia = React.memo(({ uri, thumbnail }: IVideoMedia) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [lastTap, setLastTap] = useState<number | null>(null)
  const videoRef = useRef<any>(null)
  const DOUBLE_TAP_DELAY = 300

  const handleDoubleTap = () => {
    const now = Date.now()
    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      setFullScreen(true)
    }
    setLastTap(now)
  }
  const togglePlayPause = () => {
    setIsPlaying((p) => !p)
  }

  const resetCurrentTimePause = () => {
    if (videoRef.current) {
      videoRef.current.seek(0)
      setIsPlaying(true)
    }
  }
  const handleFullScren = () => setFullScreen((f) => !f)

  return thumbnail ? (
    <Image source={{ uri }} width={300} height={300} />
  ) : (
    <Pressable onPress={handleDoubleTap}>
      <View className="items-center justify-center relative p-1 overflow-hidden">
        {!isPlaying ? (
          <Ionicons
            name="pause"
            className="absolute z-10"
            size={50}
            color="#fff"
            onPress={togglePlayPause}
          />
        ) : (
          <Ionicons
            name="play"
            className="absolute z-10"
            size={50}
            color="#fff"
            onPress={togglePlayPause}
          />
        )}
        <TouchableOpacity className="absolute bottom-0 right-0 z-10" onPress={handleFullScren}>
          <Ionicons name="expand" size={30} />
        </TouchableOpacity>
        <Video
          source={{
            uri,
          }}
          repeat={true}
          resizeMode="cover"
          fullscreen={fullScreen}
          controls={fullScreen}
          onFullscreenPlayerDidDismiss={handleFullScren}
          paused={isPlaying}
          ref={videoRef}
          style={{
            height: fullScreen ? 1000 : 200,
            width: 300,
          }}
          onEnd={resetCurrentTimePause}
        />
      </View>
    </Pressable>
  )
})
