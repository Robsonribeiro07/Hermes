import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '../ui/actionsheet'

export function CreateMoreSheet() {
  return (
    <Actionsheet>
      <ActionsheetBackdrop />
      <ActionsheetContent className="min-h-[30%]">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
      </ActionsheetContent>
    </Actionsheet>
  )
}
