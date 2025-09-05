import { Heading } from '@/components/ui/heading'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal'
import { useTheme } from '@/theme/theme-context'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Text } from 'react-native'
import { DowloadQrImage } from './dowload-qr-image'
import { ShareQrImage } from './send-qr-code'

const WithoutAnotherCell = () => {
  const { colors } = useTheme()
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <Ionicons
        name="alert-circle"
        color={colors.blueText}
        size={30}
        onPress={() => setOpen(!open)}
      />
      <Modal isOpen={open}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader className="justify-center">
            <Heading>Unico Aparelho?</Heading>
            <ModalCloseButton className="absolute right-0 " onPress={() => setOpen(!open)}>
              <Ionicons name="close" size={20} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <Text>
              "Se você não tiver outro celular, pode enviar este QR code para um amigo ou familiar
              escanear no aparelho deles e prosseguir com a configuração."
            </Text>
          </ModalBody>

          <ModalFooter className="gap-10">
            <DowloadQrImage color={colors.blueText} />
            <ShareQrImage color={colors.blueText} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { WithoutAnotherCell }
