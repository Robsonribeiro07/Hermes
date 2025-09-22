import Slider from '@react-native-community/slider'
import { Text, View } from 'react-native'
import { Timer } from './timer'
interface ISliderAudio {
  duration: number
  postion: number
  waveform: number[]
  seekTo: (ms: number) => void
}
export function SliderAudio({ duration, postion, waveform, seekTo }: ISliderAudio) {
  return (
    <View className="flex-row flex-1 items-center ">
      <Slider
        style={{
          width: 200,
          position: 'absolute',
          backgroundColor: 'transparent',
        }}
        thumbTintColor="transparent"
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        minimumValue={0}
        maximumValue={duration - 10}
        value={postion}
        onValueChange={(ms) => seekTo(ms)}
      />

      <View className="flex-row flex-1 justify-between items-center pl-3">
        {waveform.map((value, index) => (
          <Text
            className="bg-white w-[2px] "
            key={index}
            style={{
              height: value,
            }}
          />
        ))}
      </View>
      <Timer timer={duration} />
    </View>
  )
}
