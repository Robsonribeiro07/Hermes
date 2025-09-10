import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useTheme } from '@/theme/theme-context'
import { MotiView } from 'moti'
import { View } from 'react-native'

interface IStatusBot {
  statusConnect: 'on' | 'off'
}
export const StatusBotConnected = ({ statusConnect = 'off' }: IStatusBot) => {
  const { colors } = useTheme()

  const colorSignalStatusBot = statusConnect === 'off' ? colors.redButton : colors.buttonBlue
  return (
    <ThemedView className="flex-row">
      <ThemedText text="Status Bot: " />

      <View className="flex-row items-center gap-3">
        <ThemedText text={statusConnect} />
        <MotiView
          className="w-4 h-4 rounded-full "
          from={{ scale: 1.2, opacity: 1 }}
          animate={{ scale: 1.2, opacity: 0.4 }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 1000,
          }}
          style={[{ backgroundColor: colorSignalStatusBot }]}
        />
      </View>
    </ThemedView>
  )
}
