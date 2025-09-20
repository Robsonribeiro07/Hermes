import { createMMKV, MMKV } from 'react-native-mmkv'

export const storaged: MMKV = createMMKV({
  id: 'appStorage',
})
