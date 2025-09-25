import { useMediaLibraryPermission } from '@/hooks/database/use-media-library-permission'
import { QRCodeStore } from '@/store/QRcode/qr-code-image-store'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
const DowloadQrImage = ({ color }: { color: string }) => {
  const { QRcode, base64 } = QRCodeStore()
  const { granted } = useMediaLibraryPermission()

  const SaveQRcodeImage = async () => {
    if (!QRcode || !base64) return

    try {
      const filename = FileSystem.cacheDirectory + 'qrcode.png'

      await FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })

      let permissionGranted = granted

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
  return (
    <Ionicons name="cloud-download-outline" size={40} color={color} onPress={SaveQRcodeImage} />
  )
}

export { DowloadQrImage }
