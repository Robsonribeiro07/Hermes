import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { MediaType } from './typed-media'

export async function SaveImageToDevice(mediaUrl: string, type: MediaType) {
  const urlExtension = type === 'image' ? 'jpg' : type === 'video' ? 'mp4' : ''

  const safeFileName = `${type}-${Date.now()}.${urlExtension}`

  const path = FileSystem.cacheDirectory + safeFileName

  const downloaded = await FileSystem.downloadAsync(mediaUrl, path)

  console.log(type)
  console.log('baixei')

  const asset = await MediaLibrary.createAssetAsync(downloaded.uri)

  let album = await MediaLibrary.getAlbumAsync(type)
  if (!album) {
    await MediaLibrary.createAlbumAsync(type, asset, false)
  } else {
    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
  }

  return downloaded.uri
}
