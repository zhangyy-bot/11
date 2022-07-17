export function dateFormate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  return `${year}-${month}-${day} ${h} : 00`
}
