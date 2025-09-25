import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Text } from 'react-native'

interface IReactionProps {
  reaction: string
}

export function Reaction({ reaction }: IReactionProps) {
  const translateY = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(1)).current
  const rotate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let isMounted = true

    const startRandomAnimation = () => {
      if (!isMounted) return
      const delay = Math.random() * 4000 + 1000

      setTimeout(() => {
        if (!isMounted) return

        const randomRotation = Math.random() * 50 - 25

        Animated.parallel([
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: -10,
              duration: 200,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 200,
              easing: Easing.in(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.2,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(rotate, {
              toValue: randomRotation,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => startRandomAnimation())
      }, delay)
    }

    startRandomAnimation()
    return () => {
      isMounted = false
    }
  }, [translateY, scale, rotate])

  const rotateDeg = rotate.interpolate({
    inputRange: [-180, 180],
    outputRange: ['-180deg', '180deg'],
  })

  return (
    <Animated.View
      style={{
        transform: [{ translateY }, { scale }, { rotate: rotateDeg }],
      }}
    >
      <Text className="text-3xl p-2 rounded-full">{reaction}</Text>
    </Animated.View>
  )
}
