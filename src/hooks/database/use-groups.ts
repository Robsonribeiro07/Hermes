import { useSyncUserData } from './use-sync-user-data'

export function useGroups() {
  const { data } = useSyncUserData()

  const groups = data?.groups

  return {
    groups,
  }
}
