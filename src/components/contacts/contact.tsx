import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const Contact = () => {
  const { push } = useRouter()

  const handleToggleFunction = () => {
    push('/(private)/(home)/contacts')
  }

  return (
    <TouchableOpacity
      onPress={handleToggleFunction}
      style={{
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 0,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      }}
    >
      <Ionicons name="chatbox-ellipses-outline" size={30} color="black" />
    </TouchableOpacity>
  )
}

export { Contact }
