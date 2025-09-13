import { IGroup, IGroupParticipant } from '@/api/user/get-user-data'
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet'
import { useState } from 'react'
import AddMembers from './add-members'
import HeaderGroupInfo from './header-group-info'
import Members from './members'
import { SideSheet } from './profile-participant/side-sheet'

const ActionSheetProfileGroup = ({
  GroupData,
  handleClose,
}: {
  GroupData: IGroup | undefined
  handleClose: () => void
}) => {
  if (!GroupData) return null

  const [open, setOpen] = useState(false)

  const [participantData, setParticipatnData] = useState<IGroupParticipant>()

  const handleCloseProfile = () => setOpen(!open)

  const handleOpen = (participant: IGroupParticipant) => {
    setOpen(true)
    setParticipatnData(participant)
  }

  return (
    <Actionsheet isOpen onClose={handleClose}>
      <ActionsheetBackdrop />

      <ActionsheetContent className="min-h-[90%] bg-secondary-500">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <HeaderGroupInfo
          imgUrl={GroupData.imgUrl}
          name={GroupData.subject}
          members={GroupData.participants.length}
        />
        <AddMembers />
        <Members members={GroupData.participants} onPress={handleOpen} />
      </ActionsheetContent>

      <SideSheet
        isOpen={open}
        onClose={handleCloseProfile}
        imgUrl={participantData?.imgUrl}
        name={participantData?.id}
        id={participantData?.id}
        isAdmin={participantData?.isAdmin}
        groupId={GroupData.id}
      />
    </Actionsheet>
  )
}

export { ActionSheetProfileGroup }
