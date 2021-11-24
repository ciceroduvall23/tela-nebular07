export function RemoveSymbols(str: string) {
  let res = ''
  const replacements = [
    { src: 'ã', replacement: 'a' },
    { src: 'â', replacement: 'a' },
    { src: 'á', replacement: 'a' },
    { src: 'ẽ', replacement: 'a' },
    { src: 'ê', replacement: 'a' },
    { src: 'é', replacement: 'a' },
    { src: 'ĩ', replacement: 'i' },
    { src: 'î', replacement: 'i' },
    { src: 'í', replacement: 'i' },
    { src: 'õ', replacement: 'o' },
    { src: 'ô', replacement: 'o' },
    { src: 'ó', replacement: 'o' },
    { src: 'ũ', replacement: 'o' },
    { src: 'û', replacement: 'o' },
    { src: 'ú', replacement: 'o' },
    { src: '/', replacement: '' },
    { src: '-', replacement: '' },
    { src: '{', replacement: '' },
    { src: '}', replacement: '' },
    { src: '+', replacement: '' },
    { src: '-', replacement: '' },
    { src: '[', replacement: '' },
    { src: ']', replacement: '' },
  ]

  for (let idx = 0; idx < str.length; idx++) {
    const letter = str[idx]

    if (letter === letter.toLocaleLowerCase()) {
      const r = replacements.find((v) => v.src === letter.toLocaleLowerCase())
      res += r?.replacement.toLocaleLowerCase()
    } else if (letter === letter.toLocaleUpperCase()) {
      const r = replacements.find((v) => v.src === letter.toLocaleLowerCase())
      res += r?.replacement.toUpperCase()
    } else {
      res += letter
    }
  }

  return res
}
