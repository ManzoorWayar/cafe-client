import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="info" />
        </div>
    )
}

export default Loader