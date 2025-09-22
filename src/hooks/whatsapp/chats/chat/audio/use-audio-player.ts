import { useEffect, useRef, useState } from 'react'
import Sound from 'react-native-sound'

export function useAudioPosition(sound: Sound | null) {
  const [position, setPosition] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!sound) return

    intervalRef.current = setInterval(() => {
      sound.getCurrentTime((sec) => setPosition(sec * 1000))
    }, 200)

    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [sound])

  return position
}
