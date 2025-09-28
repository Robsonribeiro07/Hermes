// FilterChat.tsx
import { RadioGroup } from '@/components/ui/radio'
import { useState } from 'react'
import { FilterComponent } from '../filter/filter-compontet'

interface IFilterChatOption {
  label: string
  value: 'all' | 'unread' | 'favorite' | 'groups'
}

const FILTER_CHAT_OPTIONS: IFilterChatOption[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Não lidos', value: 'unread' },
  { label: 'Favoritas', value: 'favorite' },
  { label: 'Grupos', value: 'groups' },
]

export function FilterChat() {
  const [selectedValue, setSelectedValue] = useState<'all' | 'unread' | 'favorite' | 'groups'>('all')

  console.log('Selected Filter:', selectedValue)
  return (
    <RadioGroup className="flex-row py-3" value={selectedValue} onChange={setSelectedValue}>
      {FILTER_CHAT_OPTIONS.map((option) => (
        <FilterComponent key={option.value} value={option.value} label={option.label} />
      ))}
    </RadioGroup>
  )
}
