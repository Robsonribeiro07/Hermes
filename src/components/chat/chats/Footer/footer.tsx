import { Box } from '@/components/ui/box'
import { ContentStickerOptions } from '../Media/sticker/content-sticker-optionst'
import { InputMessage } from './input-message'
import { SendMessage } from './send-message'

interface IFooter {
  userId: string
}
export function Footer({ userId }: IFooter) {
  return (
    <Box className="w-full h-[10%] flex-row  items-center gap-3 px-4">
      <InputMessage userId={userId} />

      <SendMessage userId={userId} />
      <ContentStickerOptions />
    </Box>
  )
}
