import { MediaType } from '@/database/whatsapp/Media/typed-media'
import { IContentMessage } from '@/store/whatsapp/chats/chat-message-store'
import React from 'react'
import { AudioPlayer } from './Media/Audio/Audio'
import { GifMedia } from './Media/gif'
import { ImageMedia } from './Media/image/image'
import { PdfPreview } from './Media/pdf/pdf'
import { TextMedia } from './Media/text'
import { VideoMedia } from './Media/Video/video'
import { StickerAnimado } from './sticker/sticker-animado'

export const mediaMap: Record<MediaType, (props: IContentMessage) => React.ReactNode> = {
  image: (props) => <ImageMedia {...props} />,
  video: (props) => {
    if (props.mimyType === 'video/mp4' && props.gifPlayback) {
      return <GifMedia uri={props.content} isVisible={props.isVisible} />
    }
    return <VideoMedia uri={props.content} isVisible={props.isVisible} />
  },
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
