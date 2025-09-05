import { QRCodeStore } from '@/store/QRcode/qr-code-image-store'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

const ShareQrImage = ({ color }: { color: string }) => {
  const { base64 } = QRCodeStore()

  const shareQRcodeImage = async () => {
    if (!base64) return

    try {
      const filename = FileSystem.cacheDirectory + 'qrcode.png'

      await FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filename)
      } else {
        alert('Compartilhamento não disponível neste dispositivo')
      }
    } catch (err) {
      console.log('Erro ao compartilhar:', err)
    }
  }

  return <Ionicons name="share-social-outline" size={40} color={color} onPress={shareQRcodeImage} />
}

export { ShareQrImage }
