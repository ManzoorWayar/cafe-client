import React from 'react'
import { Col, Badge, ListGroup } from 'react-bootstrap'

const SpendItem = ({ item, index }) => {
    const { SpendMoneyDesc, spendMoney } = item

    return (
        <Col lg={6} md={6} sm={12} className='m-auto mt-5'>
            <ListGroup as="ol">
                <ListGroup.Item
                    as="li"
                    action
                    className="d-flex justify-content-between align-items-center"
                >
                    <h6 className='m-0'>{index + 1}.</h6>
                    <div className="ms-2 me-auto">
                        <p className="fw-bold m-0 m-1">{SpendMoneyDesc}</p>
                    </div>
                    <Badge bg="info" pill>
                        {spendMoney}
                    </Badge>
                </ListGroup.Item>
            </ListGroup>
        </Col >
    )
}

export default SpendItem