import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

type MediaType = 'image' | 'video' | 'audio'

export async function saveMediaToDevice(mediaUrl: string, type: MediaType) {
  const extensions = { image: 'jpg', video: 'mp4', audio: 'mp3' }
  const ext = extensions[type]

  const fileName = `${type}-${Date.now()}.${ext}`
  const hermesFolder = FileSystem.documentDirectory + 'Hermes/'
  const filePath = hermesFolder + fileName

  const folderInfo = await FileSystem.getInfoAsync(hermesFolder)
  if (!folderInfo.exists) {
    await FileSystem.makeDirectoryAsync(hermesFolder, { intermediates: true })
  }
  const downloaded = await FileSystem.downloadAsync(mediaUrl, filePath)

  const asset = await MediaLibrary.createAssetAsync(downloaded.uri)

  const addToAlbum = async (albumName: string) => {
    let album = await MediaLibrary.getAlbumAsync(albumName)
    if (!album) {
      await MediaLibrary.createAlbumAsync(albumName, asset, false)
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
    }
  }

  await addToAlbum('Hermes')
  await addToAlbum(`Hermes - ${type}`)
  return downloaded.uri
}
