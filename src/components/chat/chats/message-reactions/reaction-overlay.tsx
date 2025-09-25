import { AlertDialog, AlertDialogBackdrop, AlertDialogContent } from '@/components/ui/alert-dialog'
import { useReactionStore } from '@/store/whatsapp/chats/use-reaction-store'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Reaction } from './reaction'

interface IReactionOverlayProps {
  visible: boolean
  touchPosition: { x: number; y: number }
  onReactionSelect: (reaction: string) => void
  onClose: () => void
}

const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏']

export function ReactionOverlay({ visible, touchPosition, onReactionSelect, onClose }: IReactionOverlayProps) {
  const { width } = useWindowDimensions()

  const { elementPosition, open, setOpen } = useReactionStore()
  return (
    <AlertDialog isOpen={open} onClose={() => setOpen(false)}>
      <AlertDialogBackdrop />
      <AlertDialogContent
        className="items-center justify-center gap-2 flex-row p-0 rounded-[25px] absolute "
        style={{
          height: 50,
          width: width * 0.8,
          left: elementPosition.x,
          top: elementPosition.y,
        }}
      >
        {REACTIONS.map((reaction) => (
          <Reaction key={reaction} reaction={reaction} />
        ))}

        <TouchableOpacity className="absolute right-2 bg-secondary-500 p-1 rounded-full">
          <Ionicons name="add-outline" size={25} />
        </TouchableOpacity>
      </AlertDialogContent>
    </AlertDialog>
  )
}
