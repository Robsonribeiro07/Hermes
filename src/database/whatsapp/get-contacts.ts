import { getSocketServices } from '@/services/socket'
import * as Contacts from 'expo-contacts'

type IPhoneNumbers = {
  number: string | undefined
  name: string
}[]

export async function getContacts() {
  const socket = getSocketServices()

  const { status } = await Contacts.requestPermissionsAsync()

  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName, Contacts.Fields.LastName],
    })

    const phoneNumbers: IPhoneNumbers = []

    data.forEach((contact) => {
      if (contact.phoneNumbers) {
        contact.phoneNumbers.forEach((p) => {
          phoneNumbers.push({
            name: contact.name || `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
            number: p.number,
          })
        })
      }
    })

    socket.emit('start-sync', { contacts: phoneNumbers })

    return phoneNumbers
  } else {
    console.log('Permissão de contatos negada')
    return []
  }
}
