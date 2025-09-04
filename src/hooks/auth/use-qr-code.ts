import qrcode from 'qrcode'
import { useEffect, useState } from 'react'

export function useQRCodeGenerate({ qrCodeData }: { qrCodeData: string }) {
  const [qrImage, setQrImage] = useState<string | null>(null)

  useEffect(() => {
    if (qrCodeData) {
      qrcode.toDataURL(qrCodeData, (err, url) => {
        if (err) {
          console.log('Error generating QR Code:', err)
          return
        }
        setQrImage(url)
      })
    }
  }, [qrCodeData])

  return { qrImage }
}
