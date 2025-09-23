import FastImage from 'react-native-fast-image'
interface IStickerAnimated {
  uri: string
}
export function StickerAnimado({ uri }: IStickerAnimated) {
  return (
    <FastImage
      style={{
        height: 150,
        width: 150,
      }}
      source={{
        uri,
      }}
      resizeMode="contain"
    />
  )
}
