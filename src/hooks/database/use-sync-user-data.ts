import { getUserData } from '@/api/user/get-user-data'
import { getUserLocaledata } from '@/database/asyncStorage/get-user-locale-data'
import { updateLocalUserdata } from '@/database/asyncStorage/update-locale-user'
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
      const localData = await getUserLocaledata()

      if (!remoteData) return localData

      console.log('remote ', remoteData)
      await updateLocalUserdata(remoteData)

      return remoteData
    },
    refetchOnWindowFocus: false,
    staleTime: 60 * 5 * 5,
  })

  useEffect(() => {
    async function handleNewUserData(newData: any) {
      await updateLocalUserdata(newData)
      console.log(newData)

      console.log('infos recebida novas')
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
