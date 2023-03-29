import React, { useState } from 'react'
import Loader from '../../components/Loader'
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap'
import { useGetAnalyticsQuery } from './analyticsApiSlice'
import { Bar } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
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
import Warning from '../../components/Warning'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Monthly = () => {
    const today = new Date()
    const [constituentDate, setConstituentDate] = useState([today.getFullYear(), today.getMonth() + 1, today.getDate()])

    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [day, setDay] = useState('');

    const { data: reportsData, isLoading, isSuccess } = useGetAnalyticsQuery(constituentDate)

    const labels = [...new Set(getMounthsOfYear([]))]

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

    const currentYear = new Date().getUTCFullYear();

    const years = Array(currentYear - (currentYear - 50))
        .fill("")
        .map((_, otherYears) => ({ label: currentYear - otherYears, value: currentYear - otherYears }));

    const monthsNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    const months = monthsNames.map((month, index) => ({ label: month, value: index + 1 }));

    const days = [...Array(31).keys()].map(
        (day) => (
            { label: day + 1, value: day + 1 }
        ))

    const handleYear = (e) => {
        setYear(e.target.value);
    };

    const handleMonth = (e) => {
        setMonth(e.target.value);
    };

    const handleDay = (e) => {
        setDay(e.target.value);
    };

    const getReport = () => {
        if (day === 'Select Day') {
            setDay('')
        }

        setConstituentDate([year, month, day === 'Select Day' ? '' : day]);
    }

    const setReset = () => {
        setConstituentDate([today.getFullYear(), today.getMonth() + 1, today.getDate()])
    }

    if (isLoading) return <Loader />

    if (isSuccess) {
        const { ids, entities } = reportsData

        const content = ids?.length > 0 && ids.map(reportId => entities[reportId])

        if (!content?.length > 0) {
            return <Warning setReset={setReset} />
        }

        const totalMoney = content?.reduce((sum, { totalAmount }) => sum + (+totalAmount || 0), 0)
        const spendMoneyTasks = content?.filter(pc => pc?.spendMoney !== undefined)
        const spendMoney = spendMoneyTasks?.reduce((sum, { spendMoney }) => sum + (+spendMoney || 0), 0)

        return (
            <section className='my-5'>
                <Container>
                    <h3 className='text-center'>Roman-Net Report</h3>
                    <Form className='my-4'>
                        <Row className='m-auto'>
                            <Col md={3} sm={12} className='m-auto'>
                                <Form.Label className="fw-bold">
                                    Year
                                </Form.Label>
                                <Form.Select value={year} onChange={handleYear}>
                                    {years.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={3} sm={12} className='m-auto'>
                                <Form.Label className="fw-bold">
                                    Month
                                </Form.Label>
                                <Form.Select value={month} onChange={handleMonth}>
                                    {months.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={3} sm={12} className='m-auto'>
                                <Form.Label className="fw-bold">
                                    Day
                                </Form.Label>
                                <Form.Select value={day} onChange={handleDay}>
                                    <option defaultValue value='Select Day'>Select Day</option>
                                    {days.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={3} sm={12} className='m-auto mt-3'>
                                <Button type='button' className='btn btn-success w-100 fw-bold mt-3' onClick={getReport}>Get Report</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row className='m-auto'>
                        <Col lg={6} md={6} sm={12} className='m-auto mt-5'>
                            <h3 className='text-center fw-bold'>Result: {`${constituentDate[0]}-${monthsNames[constituentDate[1] - 1]} ${constituentDate[2]}`}</h3>
                            <Table bordered hover variant='dark' className='my-5'>
                                <thead>
                                    <tr className='text-center'>
                                        <th>Total</th>
                                        <th>Spend Money</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-center'>
                                        <td>{totalMoney} AFG</td>
                                        <td>{spendMoney} AFG</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className='m-auto'>
                        <Col md={12} sm={12} className='m-auto'>
                            <Bar options={options} data={data} />
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Monthly