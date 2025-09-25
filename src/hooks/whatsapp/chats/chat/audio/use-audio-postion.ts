import { useEffect, useRef, useState } from 'react'
import Sound from 'react-native-sound'

export function useAudioPosition(sound: Sound | null) {
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!sound) return

    const total = sound.getDuration() * 1000

    setDuration(total)

    intervalRef.current = setInterval(() => {
      sound.getCurrentTime((sec) => {
        const pos = sec * 1000
        if (pos >= total) {
          setPosition(0)
          return
        }

        setPosition(sec * 1000)
      })
    }, 200)

    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [sound])

  const seekTo = (ms: number) => {
    if (!sound) return
    const sconds = ms / 1000
    sound.setCurrentTime(sconds)
    setPosition(ms)
  }
  return { duration, position, seekTo }
}
