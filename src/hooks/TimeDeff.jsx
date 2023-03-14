import React, { useEffect, useState } from 'react'

const TimeDeff = ({ from, to }) => {
    const [ctime, setTime] = useState(0)

    useEffect(() => {
        const passedTimeDiff = () => {
            const ascertain = to ? new Date(to).getTime() : Date.now()

            let diff = (new Date(from).getTime() - ascertain) / 1000;
            diff /= 60;
            setTime(Math.abs(Math.round(diff)))
        }

        passedTimeDiff()

        const interval = setInterval(() => {
            passedTimeDiff()
        }, 60000)

        return () => clearInterval(interval)

    }, []);

    return <h6>{ctime} mins</h6>
}

export default TimeDeff