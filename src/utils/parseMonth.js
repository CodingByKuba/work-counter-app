export const parseMonth = (month, uppercased) => {
    if(month === "1" || month === "01") return uppercased ? "Styczeń" : "styczeń"
    if(month === "2" || month === "02") return uppercased ? "Luty" : "luty"
    if(month === "3" || month === "03") return uppercased ? "Marzec" : "marzec"
    if(month === "4" || month === "04") return uppercased ? "Kwiecień" : "kwiecień"
    if(month === "5" || month === "05") return uppercased ? "Maj" : "maj"
    if(month === "6" || month === "06") return uppercased ? "Czerwiec" : "czerwiec"
    if(month === "7" || month === "07") return uppercased ? "Lipiec" : "lipiec"
    if(month === "8" || month === "08") return uppercased ? "Sierpień" : "sierpień"
    if(month === "9" || month === "09") return uppercased ? "Wrzesień" : "wrzesień"
    if(month === "10") return uppercased ? "Październik" : "październik"
    if(month === "11") return uppercased ? "Listopad" : "listopad"
    if(month === "12") return uppercased ? "Grudzień" : "grudzień"
}