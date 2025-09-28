// hooks/useLongPressGesture.ts
import { useCallback } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'

interface UseLongPressGestureProps {
  onLongPress: (x: number, y: number) => void
  minDuration?: number
  enabled?: boolean
  sending?: boolean
  messageId: string
}

export function useLongPressGesture({ onLongPress, minDuration = 500, enabled = true, sending = false, messageId }: UseLongPressGestureProps) {
  const handleLongPress = useCallback(
    (x: number, y: number) => {
      if (sending) return
      onLongPress(x, y)
    },
    [onLongPress, sending],
  )

  const longPressGesture = Gesture.LongPress()
    .minDuration(minDuration)
    .enabled(enabled && !sending)
    .onStart((event) => {
      'worklet'
      runOnJS(handleLongPress)(event.absoluteX, event.absoluteY)
    })

  return longPressGesture
}
