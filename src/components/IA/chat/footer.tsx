import { Box } from '@/components/ui/box'
import { InputMessage } from './input-message'
import { SendMessage } from './send-message'

export function Footer() {
  return (
    <Box className="w-full h-[10%] flex-row  items-center gap-3">
      <InputMessage />

      <SendMessage />
    </Box>
  )
}
