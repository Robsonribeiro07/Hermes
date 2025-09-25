import { GetRandomGifts } from '@/api/gifs/get-random-gifts'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useGetRandomGifs() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['random-gifs'],
    queryFn: ({ pageParam = 0 }) => GetRandomGifts(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return pages.length
    },
    initialPageParam: 0,
  })

  return {
    data,
    fetchNextPage,
  }
}
