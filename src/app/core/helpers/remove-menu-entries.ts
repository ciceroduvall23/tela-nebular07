import { NbMenuItem } from '@nebular/theme'

export const removeMenuEntries = (
  menuItems: NbMenuItem[],
  entriesToRemove: string[]
): NbMenuItem[] => {
  entriesToRemove = entriesToRemove.map((s) => s.toLowerCase())
  return menuItems.filter((m) => entriesToRemove.indexOf(m.title.toLowerCase()) == -1)
}
