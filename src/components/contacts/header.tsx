import { getContacts } from '@/database/whatsapp/get-contacts'
import { useContactStore } from '@/store/use-conctact-store'
import { Ionicons } from '@expo/vector-icons'
import ThemedView from '../theme/themed-view'
import { Input, InputField } from '../ui/input'
import { ActionOption } from './action-option'

interface IHeaderAction {
  onChangeText: (text: string) => void
}
const HeaderAcionSheetContent = ({ onChangeText }: IHeaderAction) => {
  const { setOpenLoading, isUploading } = useContactStore()

  const handleSyncContacts = () => {
    if (!isUploading) {
      getContacts()
    }

    setOpenLoading()
  }

  return (
    <ThemedView className="flex-row items-center gap-10">
      <Input className="bg-secondary-500  flex-1 h-16 px-2">
        <Ionicons name="search-outline" size={30} />
        <InputField
          onChangeText={onChangeText}
          className="font-poppins text-xl placeholder:text-primary-300"
          placeholder="Pesquisa por um contato"
        />
      </Input>

      <ActionOption sycronizeFn={handleSyncContacts} isUploading={isUploading} />
    </ThemedView>
  )
}

export { HeaderAcionSheetContent }
