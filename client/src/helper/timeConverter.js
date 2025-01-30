
const timeConverter = (time) => {

    let hours = Number(time.toString().split(":")[0])
    const modifuyedHours = hours > 12 ? hours - 12 : hours

    const minute = time.toString().split(":")[1]


    return `${modifuyedHours}:${minute}`
}

export default timeConverter