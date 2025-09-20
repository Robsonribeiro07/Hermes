import { getSocketServices } from '@/services/socket'
import { useContactStore } from '@/store/use-conctact-store'
import { IUserContact, useUserContactPersistStore } from '@/store/whatsapp/use-contact-store'
import { formatWhatasppNumber } from '@/utils/whatsapp/format-whatsapp-numer'
import { useEffect, useState } from 'react'

export interface IWhatsappContact {
  exists: boolean
  jid: string
  lid: string
}

export interface IContactData {
  contactData: IWhatsappContact
  imgUrl: string | null
  name: string | undefined
  number: string | undefined
}

export interface ISocketContactLoaded {
  contact: string
  index: number
  status: 'loading' | 'success' | 'failed'
  data?: IContactData
}

export interface ILoadingData {
  contact: {
    number: string
    name: string
  }
  index: number
  status: string
  total: number
}

export interface IResponseData {
  successContacts: IContactData[]
  failedContacts: { contact: string; error: string[] }[]
}

import { useRef } from 'react'

export function useListenContactSync() {
  const { setIsUploading, setFinishingUploading, setOpenLoading } = useContactStore()
  const { addContact, setUpdateAt } = useUserContactPersistStore()
  const [loadingData, setLoadingData] = useState<ILoadingData>()

  const socketRef = useRef(getSocketServices())

  useEffect(() => {
    const socket = socketRef.current

    const handleStarted = () => {
      setIsUploading()
      setOpenLoading()
    }

    const handleLoading = (data: ILoadingData) => {
      setLoadingData(data)
    }

    const handleLoaded = (data: ISocketContactLoaded) => {
      if (data.data) {
        const userContact: IUserContact = {
          jid: data.data.contactData.jid,
          exist: data.data.contactData.exists,
          lid: data.data.contactData.lid,
          imgUrl: data.data.imgUrl ?? null,
          name: data.data.name,
          number: formatWhatasppNumber(data.data.number),
        }
        addContact(userContact)
      }
    }

    const handleFinished = () => {
      setFinishingUploading('finishing')
      setUpdateAt(new Date())
    }

    const handleRecent = () => {}

    socket.on('contact-loading', handleLoading)
    socket.on('contact-loaded', handleLoaded)
    socket.on('finished-uploading-contacts', handleFinished)
    socket.on('started-loadings', handleStarted)
    socket.on('recent-update', handleRecent)

    return () => {
      socket.off('started-loadings', handleStarted)
      socket.off('contact-loading', handleLoading)
      socket.off('contact-loaded', handleLoaded)
      socket.off('finished-uploading-contacts', handleFinished)
      socket.off('recent-update', handleRecent)
    }
  }, [])

  return { loadingData }
}
