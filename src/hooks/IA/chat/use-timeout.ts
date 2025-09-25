import { useRef } from 'react'

export function useTimeout() {
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null)

  const start = (cb: () => void, delay: number) => {
    clear()
    ref.current = setTimeout(cb, delay)
  }

  const clear = () => {
    if (ref.current) {
      clearTimeout(ref.current)
      ref.current = null
    }
  }

  return { start, clear }
}
