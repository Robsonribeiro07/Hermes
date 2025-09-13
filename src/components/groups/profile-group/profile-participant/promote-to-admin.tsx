import { Button, ButtonText } from '@/components/ui/button'
import { Ionicons } from '@expo/vector-icons'

const PromoteToAdmin = () => {
  return (
    <Button className=" h-12 bg-blue-500 " action="secondary" variant="solid">
      <Ionicons name="shield-outline" size={20} color="#fff" />
      <ButtonText className="text-white font-poppins">Promote To admin</ButtonText>
    </Button>
  )
}

export { PromoteToAdmin }
