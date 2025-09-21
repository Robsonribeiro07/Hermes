import { Ionicons } from '@expo/vector-icons'
import { Video } from 'expo-av'
import { View } from 'moti'
import { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'

interface IVideoMedia {
  uri: string
  thumbnail?: string
}
export function VideoMedia({ uri, thumbnail }: IVideoMedia) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentime, setCurrenTime] = useState(0)

  const togglePlayPause = () => {
    setIsPlaying((p) => !p)
  }

  return thumbnail ? (
    <Image source={{ uri }} width={300} height={300} />
  ) : (
    <View className="items-center justify-center relative">
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
      <TouchableOpacity className="absolute bottom-0 right-5 z-10">
        <Ionicons name="expand" size={30} />
      </TouchableOpacity>
      <Video
        source={{
          uri,
        }}
        onEnd={togglePlayPause}
        paused={isPlaying}
        onProgress={currentime}
        style={{
          height: 300,
          width: 300,
          transform: [{ rotate: '2deg' }],
        }}
      />
    </View>
  )
}
