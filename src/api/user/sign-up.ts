import api from '@/lib/axios'

export interface IsignOut {
  user: string
  passowrd: string
  id: string
}
export interface IsignOutResponse {
  QRcode: string
  message: string
}

export async function SignUpAPi({ user, passowrd, id }: IsignOut): Promise<IsignOutResponse> {
  const data = {
    user,
    passowrd,
    id,
  }

  try {
    const response = await api.post('user/create', data)

    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}
