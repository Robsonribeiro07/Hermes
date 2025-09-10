import { QRCodeStore } from '@/store/QRcode/qr-code-image-store'

interface IsetQRcode {
  qr: string
  base64: string
}

export function setQRcodeStore({ qr, base64 }: IsetQRcode) {
  const { setBase64, setQRcode } = QRCodeStore.getState()

  setBase64(base64)
  setQRcode(qr)
}
