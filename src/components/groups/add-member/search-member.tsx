import { Input, InputField } from '@/components/ui/input'
import { Ionicons } from '@expo/vector-icons'

interface ISearchMember {
  onChangeText: (text: string) => void
}
const SearchMember = ({ onChangeText }: ISearchMember) => {
  return (
    <Input className="bg-secondary-500   h-16 px-2 rounded-2xl">
      <Ionicons name="search-outline" size={30} />
      <InputField
        className="font-poppins text-xl placeholder:text-primary-300"
        placeholder="Pesquisa por um contato"
        onChangeText={onChangeText}
      />
    </Input>
  )
}

export { SearchMember }
