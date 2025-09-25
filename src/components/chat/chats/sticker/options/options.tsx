import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'

interface Ioptions {
  label: string
  icon: keyof typeof Ionicons.glyphMap
  onPress: () => void
}
export function Options({ label, icon, onPress }: Ioptions) {
  const IconComponents = <Ionicons name={icon} size={30} />
  return (
    <TouchableOpacity className="flex-1 flex-row items-center w-full gap-5" onPress={onPress}>
      {IconComponents}
      <Text className=" font-poppins">{label}</Text>
    </TouchableOpacity>
  )
}
