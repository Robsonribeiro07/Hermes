import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Appearance } from 'react-native'
import { darkColors, lightColors } from './colors'

interface Theme {
  colors: typeof lightColors
  mode: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<Theme | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(Appearance.getColorScheme() || 'light')


  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const colors = mode === 'light' ? lightColors : darkColors

  return (
    <ThemeContext.Provider value={{ colors, mode, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  return context
}
