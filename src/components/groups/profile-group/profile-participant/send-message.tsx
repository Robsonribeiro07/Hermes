import { Button, ButtonText } from '@/components/ui/button'
import { Ionicons } from '@expo/vector-icons'

const SendMessage = () => {
  return (
    <Button className="bg-white h-12" action="secondary" variant="solid">
      <Ionicons name="chatbox-ellipses-outline" size={20} color="#3b82f6" />
      <ButtonText className="text-blue-500 font-poppins">Message</ButtonText>
    </Button>
  )
}

export { SendMessage }
