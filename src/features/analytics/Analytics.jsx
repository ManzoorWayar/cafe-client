import React from 'react'
import Chart from 'react-apexcharts'
import SpendItem from '../home/SpendItem'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { calculatePercentage } from '../../utils/utils'
import { selectAllPcs, useGetPcsQuery } from '../home/pcApiSlice'
import { Container, Row, Col, Table, ListGroup } from 'react-bootstrap'

const Analytics = () => {
    const { isLoading, isSuccess, isError, error } = useGetPcsQuery();

    const targetMoney = 500
    const pcs = useSelector(selectAllPcs)

    const existMoney = pcs.filter(pc => Intl.DateTimeFormat({ local: 'en-us' })
        .format(new Date(pc?.createdAt)) === Intl.DateTimeFormat({ local: 'en-us' })
            .format(new Date()))
        .reduce((sum, { totalAmount }) => sum + (+totalAmount || 0), 0)

    const spendMoneyTasks = pcs.filter(pc => pc?.spendMoney !== undefined)

    const spendMoney = spendMoneyTasks.reduce((sum, { spendMoney }) => sum + (+spendMoney || 0), 0)

    const options = {
        chart: {
            height: 350,
            type: 'radialBar',
        },

        plotOptions: {
            radialBar: {
                hollow: {
                    size: '80%',
                }
            },
        },
        labels: ['500 Afg Target', 'Second Money Target'],
    }

    if (isLoading) return <Loader />

    return (
        <section className='mt-5'>
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12} className='m-auto'>
                        <h3 className='text-center'>Today Amount: {existMoney} AFG</h3>
                        <Chart options={options} series={calculatePercentage(existMoney, targetMoney)} type='radialBar' height={350} />
                    </Col>
                    <Col lg={6} md={6} sm={12} className='m-auto'>
                        <h3 className='text-center mb-3'>Accounting Table</h3>
                        <Table bordered hover variant='dark' className='mt-s5'>
                            <thead>
                                <tr className='text-center'>
                                    <th>Today</th>
                                    <th>Spend Money</th>
                                    <th>Cash</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center'>
                                    <td>{existMoney} AFG</td>
                                    <td>{spendMoney} AFG</td>
                                    <td>{existMoney - spendMoney} AFG</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row>
                    {spendMoneyTasks?.map((item, index) => <SpendItem key={item?._id} item={item} index={index} />)}
                </Row>
            </Container >
        </section >
    )
}

export default Analytics