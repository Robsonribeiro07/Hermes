import { useEffect } from 'react'
import { BackHandler } from 'react-native'

interface IUseBackHandler {
  customFunctions: () => boolean
}

export function useBackHandler({ customFunctions }: IUseBackHandler) {
  useEffect(() => {
    const onBackPress = () => {
      return customFunctions()
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => subscription.remove()
  }, [customFunctions])
}
