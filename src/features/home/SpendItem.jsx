import React from 'react'

const SpendItem = ({ index, item }) => {
    const { SpendMoneyDesc, spendMoney } = item

    return (
        <article className='d-flex justify-content-center align-items-center gap-3'>
            <h5 className='p-0 m-0'>#{index + 1}</h5>
            <p className='p-0 m-0'>{SpendMoneyDesc}</p>
            <h6 className='p-0 m-0'>{spendMoney} afg</h6>
        </article>
    )

}

export default SpendItem