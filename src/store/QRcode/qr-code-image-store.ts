import { create } from 'zustand'

interface IQRCodeImageStore {
  QRcode: any | undefined
  base64: string | undefined
  setQRcode: (QRcode: any) => void
  setBase64: (base64: string) => void
}

export const QRCodeStore = create<IQRCodeImageStore>((set) => ({
  QRcode: undefined,
  base64: undefined,
  setQRcode: (QRcode: any) => set({ QRcode }),
  setBase64: (base64: string) => set({ base64 }),
}))
