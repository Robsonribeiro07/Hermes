import { IGroup } from '@/api/user/get-user-data'
import { useEffect, useState } from 'react'
import { useSyncUserData } from './use-sync-user-data'

export function useGroups() {
  const { data } = useSyncUserData()

  const [groups, setGroups] = useState<IGroup[]>()

  useEffect(() => {
    if (!data?.groups) return
    setGroups(data?.groups)
  }, [data])

  return {
    groups,
  }
}
