import { getUserData } from '@/api/user/get-user-data'
import { getUserLocaledata } from '@/database/MMKV/get-user-locale-data'
import { updateLocalUserdata } from '@/database/MMKV/update-locale-user'
import { getSocketServices } from '@/services/socket'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useSyncUserData() {
  const socket = getSocketServices()

  const queryClient = useQueryClient()

  const { data, refetch } = useQuery({
    queryKey: ['user-data'],
    queryFn: async () => {
      const remoteData = await getUserData()
      const localData = getUserLocaledata()

      if (!remoteData) return localData

      await updateLocalUserdata(remoteData)

      return remoteData
    },
    staleTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    async function handleNewUserData(newData: any) {
      updateLocalUserdata(newData)

      queryClient.setQueryData(['user-data'], newData)
    }

    socket.on('new-user-data', handleNewUserData)

    return () => {
      socket.off('new-user-data', handleNewUserData)
    }
  }, [socket, queryClient])

  return {
    refetch,
    data,
  }
}
