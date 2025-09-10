export function formatWhatasppNumber(id: string) {
  let number = id.split('@')[0].split(':')[0]

  const ddd = number.slice(0, 2)
  const dd = number.slice(2, 4)
  const rest = number.slice(4)

  const formated =
    rest.length === 9
      ? `+${ddd} (${dd}) ${rest.slice(0, 5)} ${rest.slice(5)} `
      : `+${ddd} ${dd} ${rest.slice(0, 4)}-${rest.slice(4)}`

  return formated
}
