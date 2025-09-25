import Video, { ResizeMode } from 'react-native-video'

interface IGifMedia {
  uri: string
  isVisible?: boolean
}
export function GifMedia({ uri, isVisible }: IGifMedia) {
  return (
    <Video
      source={{ uri }}
      style={{ width: 200, height: 200 }}
      muted
      repeat
      paused={!isVisible}
      playInBackground={false}
      playWhenInactive={false}
      resizeMode={ResizeMode.COVER}
    />
  )
}
