import { Skeleton } from '@/components/ui/skeleton'
import { useWindowDimensions } from 'react-native'

export function Loading() {
  const { width } = useWindowDimensions()
  return (
    <Skeleton
      className=" bg-secondary-500"
      style={{
        width: width * 0.6,
        height: 200,
        borderRadius: 16,
        backgroundColor: '#ccc',
      }}
    />
  )
}
