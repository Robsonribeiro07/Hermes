import { Box } from '@/components/ui/box'
import { useGetRandomGifs } from '@/hooks/whatsapp/chats/chat/gifs/use-get-random-gifs'
import { FlatList } from 'react-native'
import { GifsMedia } from './gifs-media'

export function GifsContent() {
  const { data, fetchNextPage } = useGetRandomGifs()

  if (!data) return null

  const gifsToRender = data.pages.flat() || []
  return (
    <Box className="w-full">
      <FlatList
        data={gifsToRender}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={20}
        windowSize={5}
        onEndReached={() => fetchNextPage()}
        renderItem={({ item }) => (
          <Box className="p-2">
            <GifsMedia url={item!} />
          </Box>
        )}
      />
    </Box>
  )
}
