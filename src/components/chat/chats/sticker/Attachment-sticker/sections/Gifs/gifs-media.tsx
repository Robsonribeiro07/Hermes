import { Skeleton } from '@/components/ui/skeleton'
import { useSendMessage } from '@/hooks/whatsapp/chats/chat/use-send-message'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

export const GifsMedia = React.memo(({ url }: { url: string }) => {
  const [loaded, setLoaded] = useState(false)

  const { handleSendGiftMessage } = useSendMessage()

  if (!url) return <Skeleton style={{ width: 100, height: 100 }} />

  return (
    <>
      {!loaded && <Skeleton style={{ width: 100, height: 100 }} />}
      <TouchableOpacity
        onPress={() => {
          console.log(url)
          handleSendGiftMessage(url)
        }}
      >
        <FastImage
          source={{ uri: url }}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
          onLoad={() => setLoaded(true)}
        />
      </TouchableOpacity>
    </>
  )
})
