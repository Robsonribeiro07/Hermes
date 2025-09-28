import { Text } from 'react-native'

interface TimerProps {
  timer: number
}
export function Timer({ timer }: TimerProps) {
  const timerConverted = parseFloat((timer / 1000).toFixed(4))
    .toString()
    .padStart(2, '0')
  return <Text className="text-primary-300-300 font-poppins text-md">{timerConverted}</Text>
}
