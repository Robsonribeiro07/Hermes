import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useTheme } from '@/theme/theme-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SkeletonInfoCard } from './skeleton-info-card'

export type InfoType = 'status' | 'whatsappId' | 'business' | 'lastSeen' | 'platform' | 'os'

interface InfoCardProps {
  type: InfoType
  value: string | number | undefined
}
type IconSet = 'Ionicons' | 'MaterialIcons'

interface InfoMapItem {
  iconSet: IconSet
  iconName: string
  label: string
}

const INFO_MAP: Record<InfoType, InfoMapItem> = {
  status: { iconSet: 'Ionicons', iconName: 'reorder-three-outline', label: 'Status' },
  whatsappId: { iconSet: 'MaterialIcons', iconName: 'tag', label: 'WhatsApp ID' },
  business: { iconSet: 'Ionicons', iconName: 'briefcase-outline', label: 'Business' },
  lastSeen: { iconSet: 'Ionicons', iconName: 'time-outline', label: 'Last Seen' },
  platform: { iconSet: 'Ionicons', iconName: 'logo-android', label: 'Platform' },
  os: { iconSet: 'Ionicons', iconName: 'phone-portrait-outline', label: 'OS' },
}

export default function InfoCard({ type, value }: InfoCardProps) {
  const { colors } = useTheme()
  const info = INFO_MAP[type]
  if (!info) return null

  const IconComponent = info.iconSet === 'Ionicons' ? Ionicons : MaterialIcons

  return (
    <TouchableOpacity>
      <ThemedView className="bg-white flex-row  gap-3 items-center mt-3">
        <IconComponent name={info.iconName as any} size={30} color={colors.secondary} />
        <ThemedView className="items-start ">
          {value ? (
            <ThemedText
              text={value}
              size={14}
              fontFamily="Poppins"
              style={[{ lineHeight: 14 }]}
              color={colors.primary}
            />
          ) : (
            <SkeletonInfoCard />
          )}
          <ThemedText
            text={info.label}
            lightColor={colors.secondary}
            darkColor={colors.secondary}
            size={12}
          />
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  )
}
