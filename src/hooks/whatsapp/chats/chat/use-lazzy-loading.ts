import { useCallback, useRef, useState } from 'react'
import { ViewToken } from 'react-native'
import { useChatWhatsapp } from './use-chat-whatsapp'

export function useLazyLoading() {
  const { filteredMessages } = useChatWhatsapp()
  const [viewedItems, setViewedItems] = useState<string[]>([])

  const onViewableItemsChangedRef = useRef(
    ({ viewableItems: visible }: { viewableItems: ViewToken[] }) => {
      if (visible.length > 0) {
        const ids = visible.map((item) => item.item.id.toString())
        setViewedItems(ids)
      }
    },
  )

  const viewabilityConfigRef = useRef({
    itemVisiblePercentThreshold: 5,
    minimumViewTime: 50,
  })

  const isItemVisible = useCallback(
    (itemId: string | number) => {
      return viewedItems.includes(itemId.toString())
    },
    [viewedItems],
  )

  const resetViewedItems = useCallback(() => {
    setViewedItems([])
  }, [])

  return {
    filteredMessages,
    viewedItems,
    viewabilityConfig: viewabilityConfigRef.current,
    onViewableItemsChanged: onViewableItemsChangedRef.current,
    isItemVisible,
    resetViewedItems,
  }
}
