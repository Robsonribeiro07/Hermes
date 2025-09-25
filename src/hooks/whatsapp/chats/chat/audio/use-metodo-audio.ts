import { RefObject, useState } from 'react'
import Sound from 'react-native-sound'

export function useAudioMetod(soundRef: RefObject<Sound | null>) {
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = () => {
    const sound = soundRef.current
    setIsPlaying(true)

    sound?.play((sucess) => {
      if (!sucess) {
        console.log('Error playing audio')
        setIsPlaying(false)
        return
      }
      setIsPlaying(false)
    })
  }

  const pauseAudio = () => {
    const sound = soundRef.current
    sound?.pause()
    setIsPlaying(false)
  }

  const stopAudio = () => {
    const sound = soundRef.current
    sound?.stop()
  }

  return {
    playAudio,
    isPlaying,
    pauseAudio,
    stopAudio,
  }
}
