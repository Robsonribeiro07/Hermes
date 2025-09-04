import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  user: z.string(),
  passowrd: z.string(),
})

export type formSchema = z.infer<typeof FormSchema>

export function useFormAuth() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<formSchema>({
    resolver: zodResolver(FormSchema),
  })

  const inputs: {
    name: keyof formSchema
    title: string
    icon: keyof typeof Ionicons.glyphMap
  }[] = [
    {
      title: 'Email or Phone',
      name: 'user',
      icon: 'umbrella-sharp',
    },
    { title: 'Senha', name: 'passowrd', icon: 'alert' },
  ]

  return {
    handleSubmit,
    control,
    isSubmitting,
    errors,
    inputs,
  }
}
