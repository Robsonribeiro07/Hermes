import { Contact } from '@/components/contacts/contact'
import { ActionsContent } from '@/components/home/actions-content'
import { ContentSheetChat } from '@/components/IA/chat/content-sheet-chat'
import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useRegisterForPushNotification } from '@/hooks/database/permission/use-register-for-push-notification'
import { useMediaLibraryPermission } from '@/hooks/database/use-media-library-permission'

export default function HomeScreen() {
  const token = useRegisterForPushNotification()
  useMediaLibraryPermission()

  return (
    <ThemedView className="flex-1">
      <ThemedText text="Home" style={[{ fontWeight: '800', fontSize: 20 }]} />
      <ActionsContent />

      <ContentSheetChat />

      <Contact />
    </ThemedView>
  )
}
