import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Warning = ({ setReset }) => {
    return (
        <Container>
            <Row className='m-auto'>
                <Col md={6} sm={12} className='m-auto'>
                    <div className='text-center text-danger fw-bold d-flex flex-column justify-content-center align-items-center vh-100 h1'>
                        <p>You Don't Have Any Report in This Date!</p>
                        <Button className='btn btn-success-outline w-100 my-3 fw-bold' onClick={setReset}>Go Back</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Warning 