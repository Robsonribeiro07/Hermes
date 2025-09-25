import { Center } from '@/components/ui/center'
import { Section, useStickerStore } from '@/store/whatsapp/chats/sticker/use-changer-section'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'

interface IchangerSection {
  icon: keyof typeof Ionicons.glyphMap
}

const IchangerSections: IchangerSection[] = [
  {
    icon: 'happy-outline',
  },
  {
    icon: 'gift-outline',
  },
  {
    icon: 'person-outline',
  },
  {
    icon: 'images-outline',
  },
]

export function ChangerSection() {
  const { changeSection, currentSection } = useStickerStore()

  return (
    <Center className="w-auto h-10 px-5 rounded-2xl flex-row gap-4 bg-secondary-600">
      {IchangerSections.map((item, index) => {
        const changerSectionFn = () => changeSection(item.icon as Section)
        const isActive = currentSection === item.icon
        return (
          <View
            key={index}
            className={`flex-row items-center ${isActive ? 'opacity-100' : 'opacity-40'}`}
          >
            <TouchableOpacity className="flex-row" onPress={changerSectionFn}>
              <Ionicons name={item.icon} size={24} />
            </TouchableOpacity>
            {index !== IchangerSections.length - 1 && (
              <View className="w-[1px] h-full bg-primary-300 ml-4" />
            )}
          </View>
        )
      })}
    </Center>
  )
}
