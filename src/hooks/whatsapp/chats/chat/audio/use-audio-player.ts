import { useEffect, useRef, useState } from 'react'
import Sound from 'react-native-sound'
import { useAudioPosition } from './use-audio-postion'
import { useAudioWaveForm } from './use-audio-wave-form'
import { useAudioMetod } from './use-metodo-audio'

export function useAudioPlayer(audioUrl: string) {
  const soundRef = useRef<Sound | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    soundRef.current = new Sound(audioUrl, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error(error)
        setIsLoaded(false)
        return
      }
      setIsLoaded(true)
    })

    return () => {
      soundRef.current?.release()
      setIsLoaded(false)
    }
  }, [audioUrl])

  const { playAudio, pauseAudio, stopAudio, isPlaying } = useAudioMetod(soundRef)
  const { duration, position, seekTo } = useAudioPosition(isLoaded ? soundRef.current : null)
  const { waveform } = useAudioWaveForm({
    duration,
    sound: soundRef.current,
    position,
    bars: 40,
    maxHeight: 40,
  })

  return {
    isPlaying,
    isLoaded,
    duration,
    waveform,
    position,
    pauseAudio,
    stopAudio,
    playAudio,
    seekTo,
  }
}
