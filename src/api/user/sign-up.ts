import api from '@/lib/axios'

export interface IsignOut {
  id: string
}
export interface IsignOutResponse {
  QRcode: string
  message:
    | 'bot-connectado'
    | 'Usuario criado'
    | 'Erro ao criar usuário'
    | 'Houve um erro ao criar o bot'
    | 'Erro interno no servidor'
  base64: string
  user: {
    id: string
  }
  statusBot: boolean
}

export async function SignUpAPi({ id }: IsignOut): Promise<IsignOutResponse> {
  try {
    const response = await api.post('user/create', { id })

    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}
