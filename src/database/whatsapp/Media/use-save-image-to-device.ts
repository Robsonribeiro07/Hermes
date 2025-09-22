import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { MediaType } from './typed-media'

const extensions: Record<MediaType, string> = {
  image: 'jpg',
  video: 'mp4',
  audio: 'mp3',
  document: 'pdf',
  'thumbnail-document': 'jpg',
  'thumbnail-video': 'jpg',
  text: 'txt',
  sticker: 'webp',
  'thumbnail-image': 'jpg',
  'thumbnail-link': 'jpg',
  gif: 'gif',
  ppic: 'jpg',
  product: 'jpg',
  ptt: 'mp3',
  ptv: 'mp4',
}
export async function saveMediaToDevice(mediaUrl: string, type: MediaType) {
  const urlExtension = extensions[type] || 'jpg'
  const safeFileName = `${type}-${Date.now()}.${urlExtension}`

  const path = FileSystem.cacheDirectory + safeFileName

  const downloaded = await FileSystem.downloadAsync(mediaUrl, path)

  const asset = await MediaLibrary.createAssetAsync(downloaded.uri)

  let album = await MediaLibrary.getAlbumAsync(type)
  if (!album) {
    await MediaLibrary.createAlbumAsync(type, asset, false)
  } else {
    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
  }

  return downloaded.uri
}
