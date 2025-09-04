import ThemedView from '@/components/theme/themed-view'
import { useTheme } from '@/theme/theme-context'
import { Slot } from 'expo-router'
import { StatusBar } from 'react-native'

const App = () => {
  const { colors } = useTheme()

  return (
    <ThemedView className="flex-1 ">
      <StatusBar barStyle="default" />
      <Slot
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </ThemedView>
  )
}

export { App }
