import { AlertDialog, AlertDialogBackdrop, AlertDialogContent } from '@/components/ui/alert-dialog'
import { Reaction, useReactionStore } from '@/store/whatsapp/chats/reactions/use-reaction-store'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Emojis } from '../sticker/Attachment-sticker/sections/Emojis/emojis'
import { ReactionComponent } from './reaction'

const REACTIONS: Omit<Reaction, 'userId' | 'timestamp' | 'fromMe'>[] = [
  {
    id: '1',
    emoji: '👍',
  },
  {
    id: '2',
    emoji: '❤️',
  },
  {
    id: '3',
    emoji: '😂',
  },
  {
    id: '4',
    emoji: '😮',
  },
  {
    id: '5',
    emoji: '😢',
  },
]

export function ReactionOverlay() {
  const { width, height } = useWindowDimensions()

  const { elementPosition, open, setOpen, showAllReactions, setShollAllReactions } = useReactionStore()
  return (
    <AlertDialog
      isOpen={open}
      onClose={() => {
        setOpen(false)
        setShollAllReactions(false)
      }}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent
        className="items-center justify-center gap-2 flex-row p-0 rounded-[25px] absolute "
        style={{
          height: 50,
          width: width * 0.7,
          left: open ? 50 : elementPosition.x,
          top: open ? height * 0.5 : elementPosition.y,
        }}
      >
        {REACTIONS.map((reaction) => (
          <ReactionComponent key={reaction.id} emoji={reaction.emoji} id={reaction.id} />
        ))}

        <TouchableOpacity
          className="absolute right-2 bg-secondary-500 p-1 rounded-full"
          onPress={() => {
            setShollAllReactions(true)
          }}
        >
          <Ionicons name="add-outline" size={25} />
        </TouchableOpacity>
      </AlertDialogContent>

      {showAllReactions && (
        <AlertDialogContent className="absolute bottom-0 w-screen">
          <Emojis comportment="reaction" />
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}
