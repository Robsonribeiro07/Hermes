import { MediaType } from '@/database/whatsapp/Media/typed-media'
import React from 'react'
import { Text } from 'react-native'
import { AudioPlayer } from './Media/Audio/Audio'
import { ImageMedia } from './Media/image'
import { VideoMedia } from './Media/video'

type IMediaMapProps = {
  content: string
  isComplete: boolean
  id?: string
  fromMe: boolean | undefined
  thumbnail?: string
}
export const mediaMap: Record<MediaType, (props: IMediaMapProps) => React.ReactNode> = {
  image: (props) => <ImageMedia {...props} />,
  video: (props) => <VideoMedia uri={props.content} thumbnail={props.thumbnail} />,
  gif: (props) => <ImageMedia {...props} />,
  'thumbnail-image': (props) => <ImageMedia {...props} />,
  'thumbnail-document': (props) => <ImageMedia {...props} />,
  'thumbnail-video': (props) => <ImageMedia {...props} />,
  'thumbnail-link': (props) => <ImageMedia {...props} />,
  product: (props) => <ImageMedia {...props} />,
  audio: (props) => <AudioPlayer uri={props.content} />,
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
