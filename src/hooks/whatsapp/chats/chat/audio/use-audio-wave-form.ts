import { useEffect, useState } from 'react'
import Sound from 'react-native-sound'

interface IUseAudioWaveForm {
  sound: Sound | null
  position: number
  duration: number
  bars: number
  maxHeight: number
}
export function useAudioWaveForm({
  sound,
  position,
  duration,
  bars,
  maxHeight,
}: IUseAudioWaveForm) {
  const [waveform, setWavefrom] = useState<number[]>(Array(bars).fill(0))

  useEffect(() => {
    if (!sound) return

    const progress = position / duration

    const newWaveForm = Array.from({ length: bars }, (_, i) => {
      const offset = Math.abs(i / bars - progress)
      return Math.random() * maxHeight * (1 - offset)
    })

    setWavefrom(newWaveForm)
  }, [position, bars, duration, maxHeight, sound])

  return { waveform }
}
