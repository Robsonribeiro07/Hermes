import ThemedView from '@/components/theme/themed-view'
import { Image } from '@/components/ui/image'
import { QRCodeStore } from '@/store/QRcode/qr-code-image-store'
import QRcode from 'react-native-qrcode-svg'
const ContentQrCode = () => {
  const { QRcode: qr } = QRCodeStore()

  console.log(qr)
  return (
    <ThemedView
      className="h-full rounded-2xl w-full justify-center items-center"
      lightColor="#fff"
      darkColor="#333333"
    >
      {qr ? (
        <QRcode value={qr} size={300} color="black" quietZone={10} />
      ) : (
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />
      )}
    </ThemedView>
  )
}

export default ContentQrCode
