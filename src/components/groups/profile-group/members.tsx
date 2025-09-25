import { IGroupParticipant } from '@/api/user/get-user-data'
import { ScrollView } from 'react-native'
import { Member } from './member'

interface MembersProps {
  members: IGroupParticipant[]
  onPress: (participant: IGroupParticipant) => void
}

const Members = ({ members, onPress }: MembersProps) => {
  if (!members || members.length === 0) return null

  return (
    <ScrollView className="w-full mt-5 h-[50%]" showsVerticalScrollIndicator={false}>
      {members.map((m, index) => (
        <Member
          key={index}
          name={m.id}
          rule={m.isAdmin}
          superAdmin={m.isSuperAdmin}
          imgUrl={m.imgUrl}
          onPress={() => onPress(m)}
        />
      ))}
    </ScrollView>
  )
}

export default Members
