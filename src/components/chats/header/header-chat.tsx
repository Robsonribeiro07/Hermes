import { ThemedText } from '@/components/theme/themed-text'
import { Center } from '@/components/ui/center'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export function HeaderChat() {
  return (
    <SafeAreaView className="w-full py-3" edges={['top']}>
      <Center className="justify-start flex-row  ">
        <ThemedText text="Hermes" lightColor="#000" size={25} className="flex-1" />

        <Center className="flex-row gap-3">
          <Ionicons name="camera-outline" size={30} color="#000" />
          <Ionicons name="menu-outline" size={30} color="#000" />
        </Center>
      </Center>
    </SafeAreaView>
  )
}
