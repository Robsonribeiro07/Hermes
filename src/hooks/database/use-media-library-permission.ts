import * as MediaLibrary from 'expo-media-library'
import { useEffect, useState } from 'react'

export function useMediaLibraryPermission() {
  const [granted, setGranted] = useState<boolean | null>(null)

  const requestPermission = async () => {
    const permisson = await MediaLibrary.requestPermissionsAsync()

    setGranted(permisson.granted)

    return permisson.granted
  }

  useEffect(() => {
    MediaLibrary.getPermissionsAsync().then((p) => setGranted(p.granted))
  })

  return {
    granted,
    requestPermission,
  }
}
