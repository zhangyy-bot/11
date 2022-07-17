// time1 2022-1-1 10:00
export function compareTime(time1, time2, interalDay = 2) {
  time1 = time1.split('-')
  time2 = time2.split('-')
  if (time1[0] > time2[0] || time1[1] > time2[1]) {
    return true
  } else if (time1[0] < time2[0] || time1[1] < time2[1]) {
    return false
  } else if (time1[2].split(' ')[0] - time2[2].split(' ')[0] > interalDay) {
    return true
  }
}

export function compareTimeStartToEnd(time1, time2) {
  time1 = time1.split('-')
  time2 = time2.split('-')
  if (time1[0] > time2[0] || time1[1] > time2[1]) {
    return true
  } else if (time1[0] < time2[0] || time1[1] < time2[1]) {
    return false
  } else if (time1[2].split(' ')[0] > time2[2].split(' ')[0]) {
    return true
  }
}
