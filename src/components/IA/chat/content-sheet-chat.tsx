import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from '@/components/ui/actionsheet'
import { AvatarProfile } from '@/components/user/avatar-profile'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { Footer } from './footer'
import { HeaderChatIA } from './header'
import { MessageContent } from './message-content'

export const ContentSheetChat = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="absolute"
        style={{
          bottom: 100,
          right: 20,
        }}
      >
        <AvatarProfile
          ImgUrl={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s'
          }
        />
      </TouchableOpacity>
      <Actionsheet isOpen={open} onClose={() => setOpen(!open)}>
        <ActionsheetBackdrop />

        <ActionsheetContent className="min-h-[90%] bg-secondary-400">
          <HeaderChatIA handleClose={handleClose} />

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="w-full"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 100}
          >
            <MessageContent />

            <Footer />
          </KeyboardAvoidingView>
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}
