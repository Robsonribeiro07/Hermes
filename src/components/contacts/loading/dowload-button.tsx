import { useContactStore } from '@/store/use-conctact-store'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

interface IDowloadButton {
  progress: number | undefined
}
export function DownloadButton({ progress }: IDowloadButton) {
  const { setOpenLoading } = useContactStore()

  if (!progress) return

  return (
    <TouchableOpacity onPress={setOpenLoading}>
      <AnimatedCircularProgress
        size={70}
        width={5}
        fill={progress}
        tintColor="#3498db"
        backgroundColor="#e0e0e0"
        rotation={0}
        style={{
          right: 30,
          bottom: 20,
          position: 'absolute',
        }}
      >
        {() => <Ionicons name="download-outline" size={30} color="black" />}
      </AnimatedCircularProgress>
    </TouchableOpacity>
  )
}
