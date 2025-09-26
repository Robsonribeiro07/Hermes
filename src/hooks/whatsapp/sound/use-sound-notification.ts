import { useEffect, useState } from 'react'
import Sound from 'react-native-sound'

Sound.setCategory('Playback')

type SoundType = 'reaction'

const SOUNDS: Record<SoundType, any> = {
  reaction: 'reaction.wav',
}

let isGloballyInitialized = false
let globalSoundRefs: Record<string, Sound> = {}
let globalIsLoaded = false

export function useSound() {
  const [isLoaded, setIsLoaded] = useState(globalIsLoaded)

  useEffect(() => {
    if (isGloballyInitialized) {
      setIsLoaded(globalIsLoaded)
      return
    }

    isGloballyInitialized = true

    const loadSound = () => {
      const promises = Object.entries(SOUNDS).map(([key, soundResource]) => {
        return new Promise<void>((resolve, reject) => {
          const sound = new Sound(soundResource, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              reject(error)
              return
            }
            globalSoundRefs[key] = sound
            resolve()
          })
        })
      })

      Promise.all(promises)
        .then(() => {
          globalIsLoaded = true
          setIsLoaded(true)
        })
        .catch((error) => {
          isGloballyInitialized = false
        })
    }

    loadSound()
  }, [])

  const playSound = (type: SoundType, volume: number = 5.0) => {
    if (!globalIsLoaded || !globalSoundRefs[type]) {
      return
    }

    const sound = globalSoundRefs[type]
    sound.setVolume(volume)
    sound.play((success) => {
      if (!success) {
        return
      }
    })
  }

  const stopSound = (type: SoundType) => {
    if (globalSoundRefs[type]) {
      globalSoundRefs[type].stop()
    }
  }

  const stopAllSounds = () => {
    Object.values(globalSoundRefs).forEach((sound) => {
      sound.stop()
    })
  }

  return {
    playSound,
    stopSound,
    stopAllSounds,
    isLoaded,
  }
}
