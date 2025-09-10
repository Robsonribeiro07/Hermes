import ThemedView from '@/components/theme/themed-view'
import { ContentInfo, IContentInfo } from './content-info'

export type InfoContents = 'CONTACT INFO' | 'ACCOUNT INFO' | 'DEVICE INFORMATION'

interface ICardContentInfoProps {
  contactStatus: string | undefined
  whatsappId: string | undefined
  isBusiness: string
  lastSeen: string | undefined | Date
  platform: string
  os: string
}

function CardContentInfo({
  whatsappId,
  contactStatus,
  isBusiness,
  lastSeen,
  platform,
  os,
}: ICardContentInfoProps) {
  const CardInfos: IContentInfo[] = [
    {
      title: 'CONTACT INFO',
      info: [
        { type: 'status', value: contactStatus },
        { type: 'whatsappId', value: whatsappId },
      ],
    },
    {
      title: 'ACCOUNT INFO',
      info: [
        { type: 'business', value: isBusiness },
        { type: 'lastSeen', value: lastSeen?.toString() },
      ],
    },
    {
      title: 'DEVICE INFORMATION',

      info: [
        { type: 'platform', value: platform },
        { type: 'os', value: os },
      ],
    },
  ]
  return (
    <ThemedView className="w-full h-full">
      {CardInfos.map((i, index) => (
        <ContentInfo info={i.info} title={i.title} key={index} />
      ))}
    </ThemedView>
  )
}

export { CardContentInfo }
