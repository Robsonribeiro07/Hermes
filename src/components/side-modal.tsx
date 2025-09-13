import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Pressable, StyleSheet } from 'react-native'

type SideModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const SideModal: React.FC<SideModalProps> = ({ isOpen, onClose, children }) => {
  const screenWidth = Dimensions.get('window').width
  const translateX = useRef(new Animated.Value(screenWidth)).current

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isOpen])

  return (
    <>
      {isOpen && <Pressable style={styles.backdrop} onPress={onClose} />}

      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        {children}
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 0,
    width: '80%',
    backgroundColor: '#D6D6D6',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
})
