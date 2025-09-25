import { Skeleton } from '@/components/ui/skeleton'
import { useWindowDimensions } from 'react-native'

export function LoadingMessage() {
  const { width } = useWindowDimensions()

  return (
    <Skeleton
      style={{
        width: width * 0.6,
        height: width * 0.6,
      }}
    />
  )
}
