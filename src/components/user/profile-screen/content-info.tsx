import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useTheme } from '@/theme/theme-context'
import { InfoContents } from './card-content.info'
import InfoCard, { InfoType } from './info-card'

export interface IContentInfo {
  info: { type: InfoType; value: string | number | undefined }[]
  title: InfoContents
}

function ContentInfo({ info, title }: IContentInfo) {
  const { colors } = useTheme()
  return (
    <ThemedView lightColor="#fff" className="w-full h-[21%] rounded-lg p-3 mt-8">
      <ThemedText text={title} size={14} lightColor={colors.secondary} />
      {info.map((info, index) => (
        <InfoCard key={index} value={info.value} type={info.type} />
      ))}
    </ThemedView>
  )
}

export { ContentInfo }
