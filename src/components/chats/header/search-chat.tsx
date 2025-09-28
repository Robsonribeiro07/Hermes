import { Input, InputField } from '@/components/ui/input'
import { Ionicons } from '@expo/vector-icons'

export function SearchChat() {
  return (
    <Input className="h-14 px-2 rounded-3xl bg-primary-500 border-0">
      <Ionicons name="search-outline" size={24} color="#D1D5DB" />
      <InputField placeholder="Pesquisar" className="placeholder:font-poppins text-xl placeholder:text-secondary-300 " />
    </Input>
  )
}
