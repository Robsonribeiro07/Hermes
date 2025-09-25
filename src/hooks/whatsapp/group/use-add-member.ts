import { useGroups } from '@/hooks/database/use-groups'
import { useSelectedContactStore } from '@/store/group/selected-contacts-store'
import { useUserContactPersistStore } from '@/store/whatsapp/use-contact-store'
import { useCallback, useMemo, useState } from 'react'

export function useAddMemberGroup(id?: string) {
  const { contacts } = useUserContactPersistStore()

  const [inputText, setInputText] = useState<string>()

  const { SelectedJid, handleAddContact } = useSelectedContactStore()

  const { groups } = useGroups()

  const groupAddedToMember = groups?.find((g) => g.id === id)

  const handleChangeText = useCallback(
    (text: string) => {
      setInputText(text)
    },
    [inputText],
  )
  const filteredContactsWithInput = useMemo(() => {
    return inputText && contacts
      ? contacts.filter((c) => c.name?.toLowerCase().includes(inputText.toLocaleLowerCase()))
      : contacts
  }, [contacts, inputText])

  const handleSelectedContacts = useCallback((jid: string) => {
    handleAddContact(jid)
  }, [])

  return {
    handleChangeText,
    SelectedJid,
    handleSelectedContacts,
    filteredContactsWithInput,
    groupAddedToMember,
  }
}
