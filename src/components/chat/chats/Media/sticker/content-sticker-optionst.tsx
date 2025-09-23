import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from '@/components/ui/actionsheet'
import { Header } from './header'

export function ContentStickerOptions() {
  return (
    <Actionsheet isOpen>
      <ActionsheetBackdrop />
      <ActionsheetContent className="min-h-[50%] bg-background-100">
        <Header />
      </ActionsheetContent>
    </Actionsheet>
  )
}
