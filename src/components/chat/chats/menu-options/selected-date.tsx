import { Modal, ModalBackdrop, ModalContent } from '@/components/ui/modal'
import { useChatWhatsappStore } from '@/store/chats/chat-store'
import { Ionicons } from '@expo/vector-icons'
import { Calendar, LocaleConfig } from 'react-native-calendars'

LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
}

LocaleConfig.defaultLocale = 'pt'

interface ISelectDate {
  userId: string
}
export function SelectedDate({ userId }: ISelectDate) {
  const { showCalendar, handleHideCalendar, handlShowCalendar, setDate, FilterMessages } =
    useChatWhatsappStore()

  const handleSetDate = (date: string) => {
    handleHideCalendar()
    setDate(userId, date)
  }
  return (
    <>
      <Ionicons name="calendar-outline" size={30} color="#47500" onPress={handlShowCalendar} />

      <Modal isOpen={showCalendar} onClose={handleHideCalendar}>
        <ModalBackdrop />

        <ModalContent>
          <Calendar
            onDayPress={(day) => handleSetDate(day.dateString)}
            theme={{
              textDayFontFamily: 'Poppins',
              textDayHeaderFontFamily: 'Poppins',
              textMonthFontFamily: 'Poppins',
              backgroundColor: '#F8F8F8',
            }}
          />
        </ModalContent>
      </Modal>
    </>
  )
}
