import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { MediaType } from './typed-media'

export async function SaveImageToDevice(mediaUrl: string, type: MediaType, fileName?: string) {
  const urlExtension = type === 'image' ? 'jpg' : type === 'video' ? 'mp4' : ''

  const safeFileName =
    fileName?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || `${type}-${Date.now()}.${urlExtension}`

  const path = FileSystem.cacheDirectory + safeFileName

  const downloaded = await FileSystem.downloadAsync(mediaUrl, path)

  const asset = await MediaLibrary.createAssetAsync(downloaded.uri)

  let album = await MediaLibrary.getAlbumAsync(type)
  if (!album) {
    await MediaLibrary.createAlbumAsync(type, asset, false)
  } else {
    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
  }

  return asset.uri
}
