import Video, { ResizeMode } from 'react-native-video'

interface IGifMedia {
  uri: string
}
export function GifMedia({ uri }: IGifMedia) {
  return <Video source={{ uri }} style={{ width: 200, height: 200 }} muted repeat playInBackground={false} resizeMode={ResizeMode.COVER} />
}
