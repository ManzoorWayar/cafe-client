import React from 'react'
import ReportItem from './ReportItem'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { Container, Row, Col } from 'react-bootstrap'
import { selectAllAnalytics, useGetAnalyticsQuery } from './analyticsApiSlice'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { getMounthsOfYear } from '../../utils/utils'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Monthly = () => {
    const { currDate } = useSelector(state => state.general)

    const { isLoading } = useGetAnalyticsQuery()

    const reports = useSelector(selectAllAnalytics)

    console.log(reports);
    if (isLoading) return <Loader />

    const labels = [...new Set(getMounthsOfYear(reports))]

    const options = {
        type: 'bar',
        responsive: true,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Report Analytics',
            },
        },
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Earn',
                data: [12, 345, 234, 343],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Spend',
                data: [123, 345],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <section className='my-5'>
            <Container>
                <h3 className='text-center'>Roman-Net Report</h3>
                <Row className='m-auto'>
                    <Col md={12} sm={12} className='m-auto'>
                        <Bar options={options} data={data} />

                    </Col>
                </Row>
            </Container>
        </section>
    )

}

export default Monthly