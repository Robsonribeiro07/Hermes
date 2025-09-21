import { MediaType } from '@/database/whatsapp/Media/typed-media'
import React from 'react'
import { Text } from 'react-native'
import Video from 'react-native-video'
import { ImageMedia } from './Media/image'

type IMediaMapProps = {
  content: string
  isComplete: boolean
  id?: string
  fromMe: boolean | undefined
}
export const mediaMap: Record<MediaType, (props: IMediaMapProps) => React.ReactNode> = {
  image: (props) => <ImageMedia {...props} />,
  video: (props) => (
    <Video
      source={{
        uri: props.content,
      }}
      resizeMode="cover"
      controls
      style={{
        width: 300,
        height: 300,
      }}
    />
  ),
  gif: (props) => <ImageMedia {...props} />,
  'thumbnail-image': (props) => <ImageMedia {...props} />,
  'thumbnail-document': (props) => <ImageMedia {...props} />,
  'thumbnail-video': (props) => <ImageMedia {...props} />,
  'thumbnail-link': (props) => <ImageMedia {...props} />,
  product: (props) => <ImageMedia {...props} />,
  audio: (props) => <ImageMedia {...props} />,
  ppic: (props) => <ImageMedia {...props} />,
  document: (props) => <ImageMedia {...props} />,
  ptv: (props) => <ImageMedia {...props} />,
  ptt: (props) => <ImageMedia {...props} />,
  sticker: (props) => <ImageMedia {...props} />,
  text: ({ fromMe, content }) => (
    <Text className={`font-poppins font-light ${fromMe ? 'text-white' : 'text-black'}`}>
      {content}
    </Text>
  ),
}
