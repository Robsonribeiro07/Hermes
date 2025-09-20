import { App } from '@/components/app'
import { NavBarFooter } from '@/components/footer/nav-bar'
import Header from '@/components/header/header'
import ThemedView from '@/components/theme/themed-view'
import { useOnToEventsUpdates } from '@/hooks/socket/use-on-to-events'
import { useNotificationListener } from '@/hooks/use-notification-listenner'
import { useChatMessageHandler } from '@/hooks/whatsapp/chats/chat/chat-message-handlers'
import { useTheme } from '@/theme/theme-context'
import { Slot, useSegments } from 'expo-router'

export default function RootLayoutPrivate() {
  useOnToEventsUpdates()
  useNotificationListener()
  useChatMessageHandler()
  const segments = useSegments()

  const { colors } = useTheme()

  const hideHeaderScreen = ['settings', 'groups', '[id]']
  const hiderPadding = ['[id]']

  const showHeader = !hideHeaderScreen.includes(segments[segments.length - 1])
  const showPadding = !hiderPadding.includes(segments[segments.length - 1])
  return (
    <ThemedView className="flex-1 " lightColor={colors.background}>
      <ThemedView className="flex-1 ">
        <ThemedView className={`flex-1 ${showPadding ? 'px-8' : 'px-0'}`}>
          {showHeader && <Header />}
          <Slot
            screenOptions={{
              headerShown: false,
            }}
          />
        </ThemedView>
        <NavBarFooter />
      </ThemedView>
    </ThemedView>
  )
}

export { App }
