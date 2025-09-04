import { useMediaLibraryPermission } from '@/hooks/database/use-media-library-permission'
import { QRCodeStore } from '@/store/QRcode/qr-code-image-store'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import qrcode from 'qrcode'
const DowloadQrImage = ({ color }: { color: string }) => {
  const { QRcode } = QRCodeStore()

  const { granted, requestPermission } = useMediaLibraryPermission()
  const SaveQRcodeImage = async () => {
    if (!QRcode) return

    try {
      const base64 = await qrcode.toDataURL(QRcode)

      const filename = FileSystem.cacheDirectory + 'qrcode.png'

      await FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })

      let permissionGranted = granted

      if (!granted) {
        permissionGranted = await requestPermission()
      }

      if (permissionGranted) {
        await MediaLibrary.createAssetAsync(filename)
        alert('QR code salvo na galeria')
      } else {
        alert('Permissao negada para salvar na galeria')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return <Ionicons name="cloud-download-outline" size={40} color={color} iboe />
}

export { DowloadQrImage }
