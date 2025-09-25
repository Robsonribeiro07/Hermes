import { AvatarProfile } from '@/components/user/avatar-profile'
import { Text, View } from 'react-native'

interface IHeaderGroupInfo {
  name: string
  members: number
  imgUrl: string | undefined
}
const HeaderGroupInfo = ({ name, members, imgUrl }: IHeaderGroupInfo) => {
  return (
    <View className="items-center w-full">
      <AvatarProfile size="2xl" ImgUrl={imgUrl} />
      <Text className="text-2xl font-bold">{name}</Text>
      <Text className="text-lg font-semibold text-primary-300">Members {members}</Text>

      <View className="w-full mt-10 ">
        <Text className="text-2xl font-semibold text-primary-400">Descriçao</Text>

        <Text className="font-semibold text-primary-200">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam quo cumque distinctio
          tempore error amet ea suscipit a autem recusandae iusto neque corporis odio fugiat
          doloribus sed, nulla dicta repellat.
        </Text>
      </View>
    </View>
  )
}

export default HeaderGroupInfo
