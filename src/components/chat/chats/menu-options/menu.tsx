import { Menu, MenuItem } from '@/components/ui/menu'
import { useChatWhatsappStore } from '@/store/whatsapp/chats/chat-store'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'

export function MenuOptions() {
  const { setFilterMessages } = useChatWhatsappStore()

  const handleSetFilterMessages = () => setFilterMessages('12')
  return (
    <Menu
      className="
    w-40"
      trigger={({ ...triggerProps }) => {
        return (
          <TouchableOpacity {...triggerProps}>
            <Ionicons name="ellipsis-vertical" size={30} />
          </TouchableOpacity>
        )
      }}
    >
      <MenuItem className="bg-secondary-200" onPress={handleSetFilterMessages} textValue="12">
        <Text className="font-poppins">Proucurar</Text>
      </MenuItem>
    </Menu>
  )
}
