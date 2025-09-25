import { Text, View } from 'react-native'

const DetailsProfile = () => {
  return (
    <View className="w-full bg-white h-48 rounded-lg mt-10 p-5 justify-between">
      <View>
        <Text className="font-semibold text-primary-300 font-poppins">JOIN DATE</Text>
        <Text className="font-semibold text-primary-800 font-poppins">January 15, 2023</Text>
      </View>

      <View className="w-full h-[1px] bg-primary-50 " />

      <View>
        <Text className="font-semibold text-primary-300 font-poppins">Status</Text>
        <Text className="font-semibold text-primary-800 font-poppins">
          "Crafiting digital expereinces"
        </Text>
      </View>
    </View>
  )
}

export { DetailsProfile }
