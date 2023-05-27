import { parseMonth } from "./parseMonth"

export const parseTitle = (date) => {
  if(date === null) {
    return "Strona główna"
  }
  date = date.toString()

  if(date.length === 10) {
    let str = date.split('-')
    if(str[2][0] === "0") str[2] = str[2][1]
    return str[2] + " " + parseMonth(str[1]) + " " + str[0]
  }

  if(date.length === 7) {
    let str = date.split('-')
    return parseMonth(str[1], "ok") + " " + str[0]
  }

  if(date.length === 4) {
    return ("Rok " + date.toString())
  }
}