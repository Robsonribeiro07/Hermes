export default ({ config }) => ({
  ...config,
  expo: {
    ...config.expo,
    name: 'Hermes',
    slug: 'Hermes',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    scheme: 'loop',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.robsonribeiro07.loop',
      infoPlist: {
        NSAppTransportSecurity: {
          NSExceptionDomains: {
            '10.0.0.109': {
              NSIncludesSubdomains: true,
              NSExceptionAllowsInsecureHTTPLoads: true,
            },
            '10.0.2.2': {
              NSIncludesSubdomains: true,
              NSExceptionAllowsInsecureHTTPLoads: true,
            },
          },
        },
      },
    },
    android: {
      jsEngine: 'hermes',

      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#F8F8F8',
      },
      edgeToEdgeEnabled: true,
      package: 'com.robson_ribeiro07.loop',
    },

    plugins: [
      'expo-router',
      'expo-dev-client',
      [
        'expo-splash-screen',
        {
          image: './src/assets/images/splash-art.png',
          resizeMode: 'cover',
        },
      ],
      'expo-notifications',

      [
        'expo-build-properties',
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: '442972f5-067f-41d0-8f06-c3d76969d277',
      },
      apirUrl:
        process.env.APP_ENV === 'production'
          ? 'https://bot-whatsapp-sepia.vercel.app'
          : process.env.APP_ENV === 'emulator'
          ? process.env.EXPO_PUBLIC_URL_API_DEV
          : process.env.EXPO_PUBLIC_URL_API || 'http://10.0.0.109:3000',
    },
  },
})
