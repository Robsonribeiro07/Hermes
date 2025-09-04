import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { Input, InputField } from '../ui/input'

interface InputContentProps {
  Title: string
  icon: keyof typeof Ionicons.glyphMap
  onChangeText?: () => void
}

export function InputContents({ Title, icon, onChangeText }: InputContentProps) {
  const { colors } = useTheme()
  return (
    <Input
      isInvalid={false}
      className="w-full my-2 py-2 rounded-lg "
      style={{
        backgroundColor: colors.foreground,
      }}
    >
      <InputField
        placeholder={Title}
        onChangeText={onChangeText}
        style={[
          {
            color: colors.text,
          },
        ]}
      />

      <Ionicons name={icon} />
    </Input>
  )
}
