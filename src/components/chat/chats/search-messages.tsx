import { Input, InputField } from '@/components/ui/input'
import { useChatWhatsappStore } from '@/store/chats/chat-store'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SelectedDate } from './menu-options/selected-date'

export function SearchMessages() {
  const { setFilterMessages, handleTextFilter } = useChatWhatsappStore()

  const onChnage = (_event: any, selectedData?: Date) => {}

  const handleCloseOnBlur = () => setFilterMessages('12')
  return (
    <SafeAreaView
      edges={['top']}
      className="flex-row justify-between w-screen items-center py-4 absolute top-0  px-2 "
      style={{
        elevation: 5,
      }}
    >
      <Input className="w-full h-16 bg-slate-600 rounded-2xl px-2">
        <InputField
          onChangeText={handleTextFilter}
          className="placeholder:font-poppins text-secondary-500"
          placeholder="Proucura por uma mensagem"
        ></InputField>

        <SelectedDate userId="12" />
      </Input>
    </SafeAreaView>
  )
}
