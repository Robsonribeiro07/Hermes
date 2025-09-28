import * as Sharing from 'expo-sharing'
import { Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
interface IPdfPreviewProps {
  link: string
}
export function PdfPreview({ link }: IPdfPreviewProps) {
  const sharingPdf = async () => {
    await Sharing.shareAsync(link)
  }
  return (
    <View className="items-center justify-center p-2" onTouchStart={sharingPdf}>
      <FastImage
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/022/030/953/small_2x/3d-file-pdf-folder-icon-illustration-png.png',
        }}
        style={{
          width: 200,
          height: 200,
        }}
        resizeMode="cover"
      />
      <TouchableOpacity className="w-full items-center ">
        <Text className="font-poppins text-primary-500">Relatorio.pdf</Text>
      </TouchableOpacity>
    </View>
  )
}
