import { Section, useStickerStore } from '@/store/whatsapp/chats/sticker/use-changer-section'
import { useEffect, useRef } from 'react'
import { View } from 'react-native'
import PageView from 'react-native-pager-view'
import { Emojis } from './Emojis/emojis'
import { GifSection } from './Gif/gif'

export function SectionsPages() {
  const { currentSection, changeSection } = useStickerStore()
  const pageRef = useRef<PageView>(null)

  const mappedSectionWithIndex = {
    'happy-outline': 0,
    'gift-outline': 1,
    'person-outline': 2,
    'images-outline': 3,
  }

  const mappedIndexWithSection = Object.fromEntries(
    Object.entries(mappedSectionWithIndex).map(([key, value]) => [value, key]),
  )
  useEffect(() => {
    const index = mappedSectionWithIndex[currentSection]
    if (pageRef.current) {
      pageRef.current.setPage(index)
      changeSection(currentSection)
    }
  }, [currentSection])

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageView
        ref={pageRef}
        initialPage={mappedSectionWithIndex[currentSection]}
        style={{ flex: 1 }}
        onPageSelected={(e) => {
          const pageIndex = e.nativeEvent.position
          const section = mappedIndexWithSection[pageIndex]
          changeSection(section as Section)
        }}
      >
        <Emojis />
        <GifSection />
      </PageView>
    </View>
  )
}
