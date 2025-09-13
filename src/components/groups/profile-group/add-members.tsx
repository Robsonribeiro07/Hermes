import { Button, ButtonText } from '@/components/ui/button'
import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

const AddMembers = () => {
  return (
    <View className="w-full flex-row justify-between mt-10">
      <Text className="font-semibold text-2xl text-primary-400">Membros</Text>

      <Button className="rounded-2xl bg-blue-500">
        <Ionicons name="pulse" color="#fff" />
        <ButtonText>Add new Member</ButtonText>
      </Button>
    </View>
  )
}

export default AddMembers
