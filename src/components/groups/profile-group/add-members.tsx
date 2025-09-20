import { Button, ButtonText } from '@/components/ui/button'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'

interface IAddMembers {
  groupdId: string
}
const AddMembers = ({ groupdId }: IAddMembers) => {
  const { push } = useRouter()
  return (
    <View className="w-full flex-row justify-between mt-10">
      <Text className="font-semibold text-2xl text-primary-400">Membros</Text>

      <Button
        className="rounded-2xl bg-blue-500"
        onPress={() =>
          push({
            pathname: '/(private)/(home)/groups/add-member/[id]',
            params: { id: groupdId },
          })
        }
      >
        <Ionicons name="pulse" color="#fff" />
        <ButtonText>Add new Member</ButtonText>
      </Button>
    </View>
  )
}

export default AddMembers
