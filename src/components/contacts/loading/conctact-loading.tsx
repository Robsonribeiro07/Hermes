import { Skeleton } from '@/components/ui/skeleton'
import { TouchableOpacity, View } from 'react-native'

const ConctactInfoSkeleton = () => {
  return (
    <TouchableOpacity className="w-full mt-5">
      <View className="flex-row items-center justify-start w-full gap-3">
        <Skeleton className="w-20 h-10 rounded-full  bg-slate-100" />

        <View>
          <Skeleton className="h-10 w-80" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export { ConctactInfoSkeleton }
