export const NEW_ARRAY = (size: number): number[] => {
  const array = new Array()

  while (array.length < size) {
    array.push(1)
  }

  return array
}
