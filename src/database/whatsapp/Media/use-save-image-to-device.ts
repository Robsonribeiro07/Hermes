export async function SaveImageToDevice(buffer: Uint8Array, fileName: string) {
  const name = fileName || `image-${Date.now()}.jpg`
  const path = `${RNFS.DocumentDirectoryPath}/${name}`
}
