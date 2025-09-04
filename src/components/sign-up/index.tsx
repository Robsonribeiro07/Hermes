import ThemedView from '../theme/themed-view'
import { FormAuth } from './form'
import { Header } from './header'

const SignUp = () => {
  return (
    <ThemedView className="flex-1 px-3  bg-slate-500 justify-center items-center">
      <Header />
      <FormAuth />
    </ThemedView>
  )
}
export { SignUp }
