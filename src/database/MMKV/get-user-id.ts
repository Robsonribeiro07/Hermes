import { storaged } from '.'

export function getUserId(): string {
  const userId = storaged.getString('userId')
  return userId ?? ''
}
