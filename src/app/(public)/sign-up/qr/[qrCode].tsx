import ContentQrCode from '@/components/sign-up/qrcode/content-qrCode'
import { HeaderQrCode } from '@/components/sign-up/qrcode/header'
import { LoadingScreen } from '@/components/sign-up/qrcode/loading-screen/loading-screen'
import { RegenerateQR } from '@/components/sign-up/qrcode/regenerateQR'
import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useListtenQRCode } from '@/hooks/bot/use-listen-qr'
import { QRCodeStore } from '@/store/QRcode/qr-code-image-store'
import { useTheme } from '@/theme/theme-context'
import { useRoute } from '@react-navigation/native'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface QRCodeParams {
  qrCode: string
}
export default function QrCodeScreen() {
  const { colors } = useTheme()
  const route = useRoute()

  const { qrCode } = route.params as QRCodeParams
  const { statusConnected } = useListtenQRCode()
  const { setQRcode } = QRCodeStore()

  useFocusEffect(
    useCallback(() => {
      if (!qrCode) return
      setQRcode(qrCode)
    }, [qrCode, qrCode]),
  )

  return (
    <>
      <ThemedView className="px-3 flex-1 justify-between" lightColor={colors.background}>
        <HeaderQrCode />
        <ThemedView className="px-10 flex-1 justify-center pb-20">
          <ThemedView className="items-center h-[50%] gap-5">
            <ContentQrCode />
            <ThemedText
              text="Scan this code with your camera"
              fontFamily="PoppinsMedium"
              size={13}
              lightColor="#2F2F2F"
            />
            <RegenerateQR disabled={statusConnected === 'on' ? true : false} />
          </ThemedView>
        </ThemedView>
        <SafeAreaView edges={['bottom']}>
          <ThemedText
            text="This code is used to coneccto your bot to your whatsapp bot"
            className="mt-auto text-center pb-5"
            fontFamily="PoppinsMedium"
            size={13}
            lightColor="#2F2F2F"
          />
        </SafeAreaView>
      </ThemedView>
      <LoadingScreen />
    </>
  )
}
