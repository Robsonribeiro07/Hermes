import * as MediaLibrary from 'expo-media-library'
import { useEffect, useState } from 'react'

export function useMediaLibraryPermission() {
  const [granted, setGranted] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAndReqeust = async () => {
      const { granted: hasPermission } = await MediaLibrary.getPermissionsAsync()

      if (!hasPermission) {
        const { granted: requested } = await MediaLibrary.requestPermissionsAsync()

        setGranted(requested)

        return
      }

      setGranted(true)
    }

    checkAndReqeust()
  }, [])

  return {
    granted,
  }
}
