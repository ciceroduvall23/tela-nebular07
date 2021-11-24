import { NbMenuItem } from '@nebular/theme'

export function assignMenuActionId(items: NbMenuItem[]) {
  return items.map((item, i, src) => {
    if (item.data) item.data = { ...item.data, id: i + 1 }
    else item.data = { id: i + 1 }
    return item
  })
}
