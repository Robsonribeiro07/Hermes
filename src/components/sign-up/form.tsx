import { useSignUp } from '@/hooks/auth/user-signout'
import ThemedView from '../theme/themed-view'
import { Button, ButtonGroup, ButtonSpinner, ButtonText } from '../ui/button'

export function FormAuth() {
  const { isPending, handleSubmitFn } = useSignUp()

  return (
    <ThemedView className="w-full items-center ">
      <ButtonGroup className="w-full">
        <Button className="bg-blue-500  h-12 rounded-lg mt-5" onPress={handleSubmitFn}>
          {isPending ? <ButtonSpinner size={40} /> : <ButtonText>Continuar</ButtonText>}
        </Button>
      </ButtonGroup>
    </ThemedView>
  )
}
