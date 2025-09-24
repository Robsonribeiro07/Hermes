import { Center } from '@/components/ui/center'
import { Ionicons } from '@expo/vector-icons'
import { ChangerSection } from './change-section'

export function Header() {
  return (
    <Center className="w-full flex-row justify-between bg items-center px-4 py-2">
      <Ionicons name="search-outline" size={30} />
      <ChangerSection />
      <Ionicons name="close-outline" size={30} />
    </Center>
  )
}
