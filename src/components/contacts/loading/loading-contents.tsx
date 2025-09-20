import { useContactStore } from '@/store/use-conctact-store'
import { LoadingFinishedUploading } from './loading-finished-contacts'
import { LoadingUpdateConctacts } from './loading-update'

const LoadingContents = () => {
  const { isUploading } = useContactStore()

  return isUploading === 'uploading' ? <LoadingUpdateConctacts /> : <LoadingFinishedUploading />
}

export default LoadingContents
