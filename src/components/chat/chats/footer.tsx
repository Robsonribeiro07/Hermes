import { InputMessage } from '@/components/IA/chat/input-message'
import { SendMessage } from '@/components/IA/chat/send-message'
import { Box } from '@/components/ui/box'
export function Footer() {
  return (
    <Box className="w-full h-[10%] flex-row  items-center gap-3">
      <InputMessage />

      <SendMessage />
    </Box>
  )
}
