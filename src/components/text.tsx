import { Text } from 'react-native'

interface ITextWithFont {
  text: string
  size?: string
  color?: string
}

const TextWithFont = ({ text, size = 'text-base', color = 'text-black' }: ITextWithFont) => {
  return <Text className={`font-inter ${size} ${color}`}>{text}</Text>
}

export default TextWithFont
