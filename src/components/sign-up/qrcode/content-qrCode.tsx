import ThemedView from '@/components/theme/themed-view'
import { Image } from '@/components/ui/image'
import { QRCodeStore } from '@/store/QRcode/qr-code-image-store'
const ContentQrCode = () => {
  const { base64: qr } = QRCodeStore()

  return (
    <ThemedView
      className="h-full rounded-2xl w-full justify-center items-center"
      lightColor="#fff"
      darkColor="#333333"
    >
      {qr ? (
        <Image source={qr} width={500} height={500} className="w-full h-full" alt="qrcode" />
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
