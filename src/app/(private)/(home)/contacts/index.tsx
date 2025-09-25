import { ConctactInfo } from '@/components/contacts/conctact-info'
import { HeaderAcionSheetContent } from '@/components/contacts/header'
import { ActionSheetcontactLoading } from '@/components/contacts/loading/action-sheet-loading'
import { DownloadButton } from '@/components/contacts/loading/dowload-button'
import ThemedView from '@/components/theme/themed-view'
import { useListenContactSync } from '@/hooks/whatsapp/use-listen-contact-sync'
import { useContactStore } from '@/store/use-conctact-store'
import { useUserContactPersistStore } from '@/store/whatsapp/use-contact-store'
import { useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native'

export default function ConctactScreen() {
  useListenContactSync()

  const { isUploading, setFinishingUploading } = useContactStore()

  const [inputText, setInputText] = useState<string>('')

  const { contacts } = useUserContactPersistStore()

  const { loadingData } = useListenContactSync()

  const handleChangeText = (text: string) => setInputText(text)

  const contactsWithFilterInput = useMemo(() => {
    if (!inputText) return contacts
    const lowerInput = inputText.toLowerCase()
    return contacts.filter((c) => c.name?.toLowerCase().includes(lowerInput))
  }, [inputText, contacts])

  useEffect(() => {
    if (isUploading === 'finishing') {
      const timer = setTimeout(() => {
        setFinishingUploading(null)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isUploading])

  return (
    <ThemedView className="flex-1">
      <HeaderAcionSheetContent onChangeText={handleChangeText} />
      <FlatList
        data={contactsWithFilterInput}
        initialNumToRender={9}
        maxToRenderPerBatch={10}
        windowSize={5}
        keyExtractor={(item, index) => item.number || index.toString()}
        renderItem={({ item }) => (
          <ConctactInfo
            jid={item.name}
            imgUrl={item.imgUrl}
            exist={item.exist}
            number={item.number}
          />
        )}
        style={{ width: '100%', marginTop: 10, flex: 1 }}
        showsVerticalScrollIndicator={false}
      />

      <DownloadButton progress={loadingData?.index ?? 0} />

      <ActionSheetcontactLoading />
    </ThemedView>
  )
}
