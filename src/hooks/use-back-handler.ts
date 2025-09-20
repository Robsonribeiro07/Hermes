import { useEffect } from 'react'
import { BackHandler } from 'react-native'

interface IuseBackHandler {
  customFunctions: () => boolean | void
}

export function useBackHandler({ customFunctions }: IuseBackHandler) {
  useEffect(() => {
    const onBackpress = () => {
      return customFunctions() || false
    }

    BackHandler.addEventListener('hardwareBackPress', onBackpress)
  }, [])
}
