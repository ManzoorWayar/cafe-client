import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { useGetAnalyticsQuery } from './analyticsApiSlice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ReportItem = ({ reportId }) => {
    const { currDate } = useSelector(state => state.general)

    const { report } = useGetAnalyticsQuery(currDate, {
        selectFromResult: ({ data }) => ({
            pc: data?.entities[reportId],
        }),
    })

    console.log(report);

    const MoneyRate = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000]

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

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
                data: MoneyRate,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Spend',
                data: [4400, 6000],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}

export default ReportItem