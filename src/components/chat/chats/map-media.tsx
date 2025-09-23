import { MediaType } from '@/database/whatsapp/Media/typed-media'
import { IContentMessage } from '@/store/whatsapp/chats/chat-message-store'
import React from 'react'
import { AudioPlayer } from './Media/Audio/Audio'
import { ImageMedia } from './Media/image/image'
import { PdfPreview } from './Media/pdf/pdf'
import { StickerAnimado } from './Media/sticker/sticker-animado'
import { TextMedia } from './Media/text'
import { VideoMedia } from './Media/video'

export const mediaMap: Record<MediaType, (props: IContentMessage) => React.ReactNode> = {
  image: (props) => <ImageMedia {...props} />,
  video: (props) => <VideoMedia uri={props.content} thumbnail={props.thumbnail} />,
  gif: (props) => <StickerAnimado uri={props.content} />,
  'thumbnail-image': (props) => <ImageMedia {...props} />,
  'thumbnail-document': (props) => <ImageMedia {...props} />,
  'thumbnail-video': (props) => <ImageMedia {...props} />,
  'thumbnail-link': (props) => <ImageMedia {...props} />,
  product: (props) => <ImageMedia {...props} />,
  audio: (props) => <AudioPlayer uri={props.content} />,
  ppic: (props) => <ImageMedia {...props} />,
  document: (props) => <PdfPreview link={props.content} />,
  ptv: (props) => <ImageMedia {...props} />,
  ptt: (props) => <ImageMedia {...props} />,
  sticker: (props) => <StickerAnimado uri={props.content} />,
  text: ({ fromMe, content, sending }) => (
    <TextMedia content={content} fromMe={fromMe} sending={sending} />
  ),
}
