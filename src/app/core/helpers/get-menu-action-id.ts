import { NbMenuItem } from '@nebular/theme'

export function getMenuActionId(item: NbMenuItem): number {
  return item.data.id
}
