import api from '@/lib/axios'

interface IGenerateQRCode {
  id: string
}

interface IGenerateQRCodeResponse {
  qr: string
  base64: string
}

export async function regenerateQRCode({
  id,
}: IGenerateQRCode): Promise<IGenerateQRCodeResponse | null> {
  if (!id) return null

  try {
    const { data } = await api.post<IGenerateQRCodeResponse>('bot/regenerate/qrcode', { id })

    if (data) {
      return {
        qr: data.qr,
        base64: data.base64,
      }
    }

    return null
  } catch (err: any) {
    throw new Error(err?.message)
  }
}
