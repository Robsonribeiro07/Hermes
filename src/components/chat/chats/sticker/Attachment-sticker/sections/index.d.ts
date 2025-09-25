import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

declare module 'emoji-mart-native' {
  interface Emoji {
    native: string
    id: string
    name: string
  }

  interface PickerProps {
    onSelect?: (emoji: Emoji) => void
    theme?: 'light' | 'dark'
    styles: ViewProps
  }

  export const Picker: React.ComponentType<PickerProps>
}
