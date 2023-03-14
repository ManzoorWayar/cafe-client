import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { Container, Row, Col } from 'react-bootstrap'
import { calculatePercentage } from '../../utils/utils'
import { selectAllPcs, useGetPcsQuery } from '../home/pcApiSlice'

const Analytics = () => {
    const { isLoading, isSuccess, isError, error } = useGetPcsQuery();

    const targetMoney = 500
    const pcs = useSelector(selectAllPcs)

    const existMoney = pcs.filter(pc => Intl.DateTimeFormat({ local: 'en-us' })
        .format(new Date(pc?.createdAt)) === Intl.DateTimeFormat({ local: 'en-us' })
            .format(new Date()))
        .reduce((sum, { totalAmount }) => sum + (+totalAmount || 0), 0)


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
                    <Col lg={4} md={6} sm={12}>
                        <h3 className='text-center'>Today Amount: {existMoney} AFG</h3>
                        <Chart options={options} series={calculatePercentage(existMoney, targetMoney)} type='radialBar' height={350} />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Analytics