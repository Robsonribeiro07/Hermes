import { useTheme } from '@/theme/theme-context'
import { Text as RNText, TextProps, TextStyle } from 'react-native'

interface ITextWithFont extends TextProps {
  text?: string
  size?: number
  weight?: TextStyle['fontWeight']
  color?: string
  lightColor?: string
  darkColor?: string
  fontFamily?: 'RobotoMono' | 'Poppins' | 'PoppinsMedium' | 'PoppinsLight'
}

const ThemedText = ({
  text,
  darkColor,
  lightColor,
  size = 16,
  weight = '400',
  fontFamily = 'Poppins',
  style,
  ...props
}: ITextWithFont) => {
  const { colors, mode } = useTheme()
  const colorTheme = mode === 'dark' ? darkColor ?? colors.text : lightColor ?? colors.text

  return (
    <RNText
      {...props}
      style={[
        {
          color: colorTheme,
          fontFamily: fontFamily,
          fontSize: size,
          fontWeight: weight,
        },
        style,
      ]}
    >
      {text}
    </RNText>
  )
}

export { ThemedText }
