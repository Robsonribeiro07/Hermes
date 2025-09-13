import { Button, ButtonGroup, ButtonSpinner, ButtonText } from '@/components/ui/button'
import { useRegenerateQRcode } from '@/hooks/bot/regenerate-qr-code'
import { useTheme } from '@/theme/theme-context'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'

const RegenerateQR = ({ disabled = false }: { disabled: boolean }) => {
  const { colors } = useTheme()

  const { handleSubmitFn, isPending, timer, isError } = useRegenerateQRcode()

  useFocusEffect(
    useCallback(() => {
      handleSubmitFn()
    }, []),
  )

  const buttonColor = isPending || timer || disabled ? colors.disabledButton : colors.buttonBlue

  return (
    <ButtonGroup className="w-full">
      <Button
        className="rounded-3pxl h-14 disabled:bg-red-500"
        style={{ backgroundColor: buttonColor }}
        onPress={handleSubmitFn}
        disabled={isPending || timer || disabled}
      >
        {isPending ? (
          <ButtonSpinner size={40} />
        ) : isError ? (
          <ButtonText>{isError}</ButtonText>
        ) : (
          <ButtonText>Regenerate QR</ButtonText>
        )}
      </Button>
    </ButtonGroup>
  )
}

export { RegenerateQR }
