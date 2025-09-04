import { View } from 'react-native'
import Actions, { actionsType } from './actions'

export interface ActionItem {
  type: actionsType
  // no futuro você pode adicionar outras propriedades, ex:
  // route?: string
  // onPress?: () => void
}

export const actionsArray: ActionItem[] = [
  { type: 'CreateRaffle' },
  { type: 'SendMessage' },
  { type: 'ManageGroups' },
  { type: 'Settings' },
]

const ActionsContent = () => {
  return (
    <View className="flex-row flex-wrap  justify-between ">
      {actionsArray.map((items) => (
        <Actions actions={items.type} key={items.type} />
      ))}
    </View>
  )
}

export { ActionsContent }
