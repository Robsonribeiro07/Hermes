import { IGroup, IuserWhatsappData } from '@/api/user/get-user-data'
import { getSocketServices } from '@/services/socket'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface IResponseDataUpdate {
  data: IGroup[]
}
export function useToHaveUpdateGroup() {
  const socket = getSocketServices()

  const queryClient = useQueryClient()

  useEffect(() => {
    const handler = ({ data }: IResponseDataUpdate) => {
      console.log('chegou qui')

      console.log(data)

      queryClient.setQueryData<IuserWhatsappData>(['user-data'], (oldData) => {
        if (!oldData) return oldData

        const udpateGroups = oldData.groups.map((group) => {
          const newData = data.find((g) => g.id === group.id)

          return newData ? { ...group, ...newData } : group
        })

        return {
          ...oldData,
          groups: udpateGroups,
        }
      })
    }

    socket.on('have-to-update', handler)

    return () => {
      socket.off('have-to-update', handler)
    }
  }, [socket])
}
