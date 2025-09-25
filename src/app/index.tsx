import { useMiddleware } from '@/hooks/auth/middleware'
import { router } from 'expo-router'

export default function App() {
  if (!router) return
  useMiddleware()

  return null
}
