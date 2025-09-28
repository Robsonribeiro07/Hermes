// FilterComponent.tsx
import { ThemedText } from '@/components/theme/themed-text'
import { Radio, RadioIndicator } from '@/components/ui/radio'
import React from 'react'

interface IFilterComponentProps {
  value: 'all' | 'unread' | 'favorite' | 'groups'
  label?: string
}

export const FilterComponent = React.memo(({ value, label }: IFilterComponentProps) => {
  return (
    <Radio value={value} accessibilityLabel={value} className="w-20 h-10 justify-center  items-center mt-3 ">
      <RadioIndicator className="bg-primary-300  rounded-3xl h-10 w-20 data-[checked=true]:bg-primary-500  data-[checked=false]:border-0 data-[checked=true]:border-outline-400">
        <ThemedText className="font-poppins text-sm text-primary-400" text={label || value} size={10} lightColor="#000" />
      </RadioIndicator>
    </Radio>
  )
})
