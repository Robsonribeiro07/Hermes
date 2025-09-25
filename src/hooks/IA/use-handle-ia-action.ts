import { Content } from './chat/typed'
import { IActionsFunctions } from './typed-actions'

export type IAAction = 'TEXT' | 'GET_CONTACTS'

interface IActionHandlers {
  action: IAAction
  content: Content
  thinkingId?: string
}

export function handleAction({ action, content, thinkingId }: IActionHandlers) {
  const fn = IActionsFunctions[action]

  if (!fn) return
  fn(content.chunk, thinkingId)
}
