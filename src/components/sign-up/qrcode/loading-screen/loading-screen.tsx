import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from '@/components/ui/actionsheet'
import { useLoadingStore } from '@/store/QRcode/use-loading-data'
import LottieView from 'lottie-react-native'
import { useEffect, useRef } from 'react'
import { Animated, Dimensions } from 'react-native'

export function LoadingScreen() {
  const { text, open } = useLoadingStore()
  if (!text) return null
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(10)).current
  const { width } = Dimensions.get('window')

  useEffect(() => {
    const animate = () => {
      opacity.setValue(0)
      translateY.setValue(10)

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          })
        }, 1000)
      })
    }

    animate()
  }, [text])

  return (
    <Actionsheet isOpen={open}>
      <ActionsheetBackdrop />

      <ActionsheetContent className="min-h-[70%] ">
        <LottieView
          autoPlay
          loop
          source={{
            uri: 'https://lottie.host/4db905e4-e01f-4831-8f5c-8aa59efe9b43/FrTQx5dhWE.lottie',
          }}
          style={{ width: width * 2, height: width * 0.8 }}
        />

        <Animated.Text
          className="text-black text-3xl mb-5"
          style={{ opacity: opacity, transform: [{ translateY: translateY }] }}
        >
          {text}
        </Animated.Text>
      </ActionsheetContent>
    </Actionsheet>
  )
}
