import { useSignUp } from '@/hooks/auth/user-signout'
import { useTheme } from '@/theme/theme-context'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'
import { ThemedText } from '../theme/themed-text'
import ThemedView from '../theme/themed-view'
import { Button, ButtonGroup, ButtonText } from '../ui/button'
import { InputContents } from './input'

export function FormAuth() {
  const { isSubmitting, inputs, control, handleSubmitFn } = useSignUp()

  const { colors } = useTheme()

  return (
    <ThemedView className="w-full items-center ">
      {inputs.map((input) => (
        <Controller
          key={input.name}
          name={input.name}
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <InputContents
                Title={input.title}
                icon={input.icon}
                key={input.name}
                onChangeText={onChange}
              />
            )
          }}
        />
      ))}
      <ThemedText
        text="Forgot your passowrd"
        className="text-right w-full"
        size={14}
        darkColor={colors.blueText}
      />
      <ButtonGroup className="w-full">
        <Button className="bg-blue-500  h-12 rounded-lg mt-5" onPress={handleSubmitFn}>
          <ButtonText>Log In</ButtonText>
        </Button>
      </ButtonGroup>
      <View className="flex-row gap-2 mt-10">
        <ThemedText text={`Don't have an account?`} size={12} fontFamily="Poppins" />
        <ThemedText text="Sign up" size={13} fontFamily="Poppins" darkColor={colors.blueText} />
      </View>
    </ThemedView>
  )
}
