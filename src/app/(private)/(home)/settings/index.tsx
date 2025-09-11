import ThemedView from '@/components/theme/themed-view'
import { CardContentInfo } from '@/components/user/profile-screen/card-content.info'
import { CardProfile } from '@/components/user/profile-screen/card-profile'
import { HeaderProfileScreen } from '@/components/user/profile-screen/header-profile-screen'
import { useSyncUserData } from '@/hooks/database/use-sync-user-data'
import { formatWhatasppNumber } from '@/utils/whatsapp/format-whatsapp-numer'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as Device from 'expo-device'
import React from 'react'
import { ScrollView } from 'react-native'
export default function ProfileScreen() {
  const { data } = useSyncUserData()

  return (
    <ThemedView className="flex-1">
      <HeaderProfileScreen />

      <ScrollView
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <CardProfile
          name={data?.name}
          number={formatWhatasppNumber(data?.id ?? '')}
          imgUrl={data?.imgUrl}
        />

        <CardContentInfo
          contactStatus={data?.name}
          whatsappId={data?.id}
          isBusiness="Yes"
          lastSeen={
            data?.connectedAt
              ? formatDistanceToNow(parseISO(data.connectedAt as string), {
                  addSuffix: true,
                  locale: ptBR,
                })
              : 'Sem data'
          }
          platform="Android"
          os={Device.osVersion || ''}
        />
      </ScrollView>
    </ThemedView>
  )
}
