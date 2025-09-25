import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet'
import { useContactStore } from '@/store/use-conctact-store'
import LoadingContents from './loading-contents'

const ActionSheetcontactLoading = () => {
  const { isUploading, openLoading, setCloseLoading } = useContactStore()

  if (isUploading === null) return

  return (
    <Actionsheet isOpen={openLoading} onClose={setCloseLoading}>
      <ActionsheetBackdrop />

      <ActionsheetContent className="min-h-[90%] bg-secondary-500 w-full">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {isUploading && <LoadingContents />}
      </ActionsheetContent>
    </Actionsheet>
  )
}

export { ActionSheetcontactLoading }
