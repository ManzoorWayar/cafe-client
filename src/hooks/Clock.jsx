import React, { useState, useEffect } from 'react'

const Clock = ({ isPaid }) => {
    let time = new Date().toLocaleTimeString()
    const [ctime, setTime] = useState(time)

    const UpdateTime = () => {
        time = new Date().toLocaleTimeString()
        setTime(time)
    }

    const interval = setInterval(UpdateTime)

    isPaid && clearInterval(interval)

    return <h6 style={{ width: '6rem' }} >{ctime}</h6>
}

export default Clock