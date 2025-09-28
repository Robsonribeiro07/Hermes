import { useTheme } from '@/theme/theme-context'
import { View, ViewProps } from 'react-native'

interface IThemedView extends ViewProps {
  className?: string
  lightColor?: string
  darkColor?: string
}

export default function ThemedView({ darkColor, lightColor = '', ...props }: IThemedView) {
  const { colors, mode } = useTheme()

  const colorTheme = mode === 'dark' ? darkColor ?? colors.background : lightColor ?? colors.background

  return (
    <View
      className="flex-1"
      {...props}
      style={[
        {
          backgroundColor: colorTheme,
        },
      ]}
    />
  )
}
