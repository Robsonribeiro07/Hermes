import { Box } from '@/components/ui/box'
import { Ionicons } from '@expo/vector-icons'
import { Options } from './options'
interface Ioptions {
  label: string
  icon: keyof typeof Ionicons.glyphMap
  onPress: () => void
}
const options: Ioptions[] = [
  {
    label: 'Adicionar as favoritas',
    icon: 'star-half-outline',
    onPress: () => {},
  },
  {
    label: 'Adicionar a pacote de figurinhas',
    icon: 'download-outline',
    onPress: () => {},
  },
  {
    label: 'Editar',
    icon: 'pencil-outline',
    onPress: () => {},
  },
  {
    label: 'Mostrar pacote de figurinhas',
    icon: 'save-outline',
    onPress: () => {},
  },
]
export function ContentOptions() {
  return (
    <Box className="flex-1 w-full h- ">
      {options.map((options, index) => (
        <Options key={index} {...options} />
      ))}
    </Box>
  )
}
