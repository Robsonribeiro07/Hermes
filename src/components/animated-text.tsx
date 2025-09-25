import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

interface IAnimatedText {
  text: string | undefined
}
export function Animatedtext({ text }: IAnimatedText) {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(10)).current

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
    <Animated.Text
      className="text-black text-3xl mb-5 font-poppins "
      style={{ opacity: opacity, transform: [{ translateY: translateY }] }}
    >
      {text?.slice(0, 9)}
    </Animated.Text>
  )
}
