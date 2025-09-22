import { useEffect, useState } from 'react'

export function useAudioWaveForm(waveFormJson: number[]) {
  const [waveform, setWavefrom] = useState<number[]>([])

  useEffect(() => {
    setWavefrom(waveFormJson)
  }, [waveFormJson])

  return waveform
}
