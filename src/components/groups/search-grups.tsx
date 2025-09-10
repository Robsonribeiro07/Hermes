import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { Input, InputField } from '../ui/input'

const SearchGrups = () => {
  const { colors } = useTheme()
  return (
    <Input
      className="w-full rounded-2xl items-center px-2"
      style={{ backgroundColor: colors.lightBlue }}
    >
      <Ionicons name="search" size={20} color={colors.secondary} />
      <InputField placeholder={'ex: amigos'} />
    </Input>
  )
}

export { SearchGrups }
