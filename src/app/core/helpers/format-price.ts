export function formatPrice(value: number | string): string {
  if (value) {
    return value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 2,
    })
  } else {
    return 'R$ 0'
  }
}
