import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export const ToForwardMessage = React.memo(({ fromMe }: { fromMe: boolean }) => {
  return (
    <TouchableOpacity className={`absolute ${fromMe ? 'left-[-50px]' : 'right-[-50px]'} `}>
      <Ionicons name="arrow-redo-outline" size={30} />
    </TouchableOpacity>
  )
})
