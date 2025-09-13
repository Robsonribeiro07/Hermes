import { SideModal } from '@/components/side-modal'
import React from 'react'
import { View } from 'react-native'
import { DetailsProfile } from './details'
import { HeaderProfileParticipant } from './header'
import { PromoteToAdmin } from './promote-to-admin'
import { RemoveFromGroup } from './remove-from-group'
import { SendMessage } from './send-message'

type SideModalProps = {
  isOpen: boolean
  onClose: () => void
  imgUrl: string | undefined
  name: string | undefined
  isAdmin: boolean | undefined
  id: string | undefined
  groupId: string
}

export const SideSheet: React.FC<SideModalProps> = ({
  isOpen,
  onClose,
  imgUrl,
  name,
  isAdmin,
  id,
  groupId,
}) => {
  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      children={
        <View className="px-5">
          <HeaderProfileParticipant name={name} isAdmin={isAdmin} imgUrl={imgUrl} />
          <DetailsProfile />
          <View className="mt-10 gap-5">
            <SendMessage />
            <RemoveFromGroup id={id} groupId={groupId} onClose={onClose} />
            <PromoteToAdmin />
          </View>
        </View>
      }
    />
  )
}
