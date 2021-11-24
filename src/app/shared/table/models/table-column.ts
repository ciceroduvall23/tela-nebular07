export class TableColumn {
  key: string
  value: string
  pipe?: {
    name: 'date' | 'currency' | 'ngx-mask'
    mask: string
  }

  constructor(
    key: string,
    value: string,
    pipe?: { name: 'date' | 'currency' | 'ngx-mask'; mask: string }
  ) {
    this.key = key
    this.value = value
    this.pipe = pipe
  }
}
