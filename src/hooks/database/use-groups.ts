import { IGroup } from '@/api/user/get-user-data'
import { useUserContactPersistStore } from '@/store/whatsapp/use-contact-store'
import { useEffect, useState } from 'react'
import { useSyncUserData } from './use-sync-user-data'

export function useGroups() {
  const { data } = useSyncUserData()

  const [groups, setGroups] = useState<IGroup[]>()

  const {} = useUserContactPersistStore()

  const groupsFilteredWithContacts = useEffect(() => {
    if (!data?.groups) return
    setGroups(data?.groups)
  }, [data])

  return {
    groups,
  }
}
