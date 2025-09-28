import { AnimatePresence, MotiView } from 'moti'
import { useState } from 'react'
import { Dimensions, Pressable } from 'react-native'
import Video from 'react-native-video'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function CinematicVideo({ uri }: { uri: string }) {
  const [fullScreen, setFullScreen] = useState(false)

  return (
    <Pressable onPress={() => setFullScreen((f) => !f)}>
      <AnimatePresence>
        <MotiView
          from={{ width: 300, height: 200, opacity: 1 }}
          animate={{
            width: fullScreen ? SCREEN_WIDTH : 300,
            height: fullScreen ? SCREEN_HEIGHT : 200,
            opacity: fullScreen ? 1 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ type: 'timing', duration: 400 }}
          style={{
            position: fullScreen ? 'absolute' : 'relative',
            top: fullScreen ? 0 : undefined,
            left: fullScreen ? 0 : undefined,
            zIndex: fullScreen ? 999 : 1,
          }}
        >
          <Video source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        </MotiView>
      </AnimatePresence>
    </Pressable>
  )
}
