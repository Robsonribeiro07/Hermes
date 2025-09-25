import { useUserContactPersistStore } from '@/store/whatsapp/use-contact-store'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'
import { Menu, MenuItem } from '../ui/menu'

interface IActionOptions {
  sycronizeFn: () => void
  isUploading: 'uploading' | 'finishing' | null
}
const ActionOption = ({ sycronizeFn, isUploading }: IActionOptions) => {
  const { canFetch } = useUserContactPersistStore()

  const disabledBlutton = isUploading !== null

  return (
    <Menu
      trigger={(triggerProps: any) => (
        <TouchableOpacity {...triggerProps}>
          <Ionicons name="settings-outline" size={30} />
        </TouchableOpacity>
      )}
      placement="bottom left"
      className="bg-secondary-700 w-40  "
    >
      <MenuItem
        textValue="sicroniza contatos"
        className="gap-3 disabled:bg-slate-100"
        onPress={sycronizeFn}
        disabled={disabledBlutton}
      >
        <Text className="font-poppins"> Sicronizar</Text>
        <Ionicons name="cloud-upload" size={30} />
      </MenuItem>
    </Menu>
  )
}

export { ActionOption }
