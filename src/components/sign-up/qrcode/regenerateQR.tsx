import { Button, ButtonGroup, ButtonText } from '@/components/ui/button'
import { useTheme } from '@/theme/theme-context'

const RegenerateQR = () => {
  const { colors } = useTheme()

  return (
    <ButtonGroup className="w-full">
      <Button className="rounded-3xl h-14" style={{ backgroundColor: colors.buttonBlue }}>
        <ButtonText>Regenerate QR</ButtonText>
      </Button>
    </ButtonGroup>
  )
}

export { RegenerateQR }
