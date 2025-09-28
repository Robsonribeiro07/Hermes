import { useFonts } from 'expo-font'
import './global.css'

import { App } from '@/components/app'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import queryClient from '@/lib/query-client'
import { ThemeProvider } from '@/theme/theme-context'
import { QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    RobotoMono: require('../assets/fonts/RobotoMono-VariableFont_wght.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    Poppins: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsMedium: require('../assets/fonts/poppins/Poppins-Medium.ttf'),
    PoppinsLight: require('../assets/fonts/poppins/Poppins-Light.ttf'),
  })

  if (!loaded) return null

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <App />
          </GestureHandlerRootView>
        </ThemeProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  )
}
