import { ActionsContent } from '@/components/home/actions-content'
import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedText text="Home" style={[{ fontWeight: '800', fontSize: 20 }]} />
      <ActionsContent />
    </ThemedView>
  )
}
