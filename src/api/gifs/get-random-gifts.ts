import giphy from '@/lib/giphy'
const glyPhyApiKey = process.env.EXPO_PUBLIC_URI_GIPHY_API_KEY
const apiTest = 'VW4Mm20mTFu8CPd840oHJ71jqA3EzsVt'
export async function GetRandomGifts(offset: number = 0) {
  try {
    const response = await giphy.get('/search', {
      params: {
        api_key: apiTest,
        q: 'cats',
        limit: 25,
        offset,
      },
    })

    if (!response.data) return null

    const urls = response.data.data.map((gif: any) => gif.images.fixed_height.url) as string[]

    return urls
  } catch (err) {
    console.log(err)
  }
}
