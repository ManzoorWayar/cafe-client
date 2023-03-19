export const formatLocalTime = (from) => {
    const fromDate = new Date(from)

    let hours = fromDate.getHours();
    let minutes = fromDate.getMinutes();
    const localTime = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes} ${localTime}`
}

export const calculatePercentage = (value, total) => {
    const percentage = +((value / total) * 100).toFixed(3)

    const secondValue = value - total;

    if (percentage > 100)
        return [100, ...calculatePercentage(secondValue, total)]

    else
        return [percentage];
}

export const sortAndFilter = (collections) => {
    collections.filter(collection => Intl.DateTimeFormat({ local: 'en-us' })
        .format(new Date(collection?.createdAt)) === Intl.DateTimeFormat({ local: 'en-us' })
            .format(new Date()))
}

export const getMounthsOfYear = (reports) => {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return reports?.map(report => new Date(report?.createdAt).getMonth()).sort((a, b) => a - b).map(name => months[name])
}

// const existMoney = pcs.filter(pc => Intl.DateTimeFormat({ local: 'en-us' })
//     .format(new Date(pc?.createdAt)) === Intl.DateTimeFormat({ local: 'en-us' })
//         .format(new Date()))
//     .reduce((sum, { totalAmount }) => sum + (+totalAmount || 0), 0)