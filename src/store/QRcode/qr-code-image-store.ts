import { create } from 'zustand'
interface IQRCodeImageStore {
  QRcode: any | undefined
}

export const QRCodeStore = create<IQRCodeImageStore>((set) => ({
  QRcode: undefined,
}))
