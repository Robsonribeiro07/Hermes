import { IGroup, IGroupParticipant } from '@/api/user/get-user-data'
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet'
import { push } from 'expo-router/build/global-state/routing'
import { useEffect, useState } from 'react'
import AddMembers from './add-members'
import HeaderGroupInfo from './header-group-info'
import Members from './members'
import { SideSheet } from './profile-participant/side-sheet'

interface ActionSheetProfileGroupProps {
  GroupData: IGroup | undefined
  handleClose: () => void
}

const ActionSheetProfileGroup = ({ GroupData, handleClose }: ActionSheetProfileGroupProps) => {
  const [open, setOpen] = useState(false)
  const [participantData, setParticipatnData] = useState<IGroupParticipant>()

  useEffect(() => {
    if (!GroupData) return
    const finderSelectParticipantData = GroupData.participants.find(
      (p) => p.id === participantData?.id,
    )
    if (finderSelectParticipantData) {
      setParticipatnData(finderSelectParticipantData)
    }
  }, [GroupData, participantData?.id])

  if (!GroupData) return null

  const handleCloseProfile = () => setOpen((prev) => !prev)

  const handleOpen = async (participant: IGroupParticipant) => {
    if (participant.id === GroupData.owner) {
      push('/(private)/(home)/settings')
      return
    }

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
        <AddMembers groupdId={GroupData.id} />
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
        userId={GroupData.owner}
      />
    </Actionsheet>
  )
}

export { ActionSheetProfileGroup }
