import { ThemedText } from '@/components/theme/themed-text'
import ThemedView from '@/components/theme/themed-view'
import { useTheme } from '@/theme/theme-context'
import { AvatarProfile } from '../avatar-profile'

interface ICardProfile {
  name: string | undefined
  number: string | undefined
  imgUrl: string | undefined | null
}
const CardProfile = ({ name, number, imgUrl }: ICardProfile) => {
  const { colors } = useTheme()
  return (
    <ThemedView className="mt-10 items-center">
      <AvatarProfile size="2xl" ImgUrl={imgUrl} />
      <ThemedView className="items-center">
        <ThemedText text={name} size={23} />
        <ThemedText text={number} weight="100" lightColor={colors.secondary} />
        <ThemedText
          text={`"Hustle and heart will set you apart.s"`}
          weight="100"
          lightColor={colors.secondary}
        />
      </ThemedView>
    </ThemedView>
  )
}

export { CardProfile }
