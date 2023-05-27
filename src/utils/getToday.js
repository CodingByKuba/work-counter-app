export const getToday = () => {
    let now = new Date()

    let month = now.getMonth()+1
    month = month.toString()
    month = month.length === 1 ? "0" + month.toString() : month

    let day = now.getDate()
    day = day.toString()
    day = day.length === 1 ? "0" + day.toString() : day

    return now.getFullYear() + "-" + month + "-" + day
}