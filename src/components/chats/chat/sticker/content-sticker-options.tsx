import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from '@/components/ui/actionsheet'
import { useStickerStateStore } from '@/store/whatsapp/chats/sticker/use-sticker-store'
import { View } from 'react-native'
import { Header } from './header'
import { ContentOptions } from './options/content-options'

export function ContentStickerOptions() {
  const { isOpen, clearContent } = useStickerStateStore()
  return (
    <Actionsheet isOpen={isOpen()} onClose={clearContent}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="min-h-[55%] pt-10 max-h-[50%] gap-5 bg-background-100 justify-between px-6">
        <Header />
        <View className="w-full h-[1px] bg-primary-300" />
        <ContentOptions />
      </ActionsheetContent>
    </Actionsheet>
  )
}
