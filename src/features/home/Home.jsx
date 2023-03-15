import React from 'react'
import PcItem from './PcItem'
import SpendMoney from './SpendMoney'
import AddCustomer from './AddCustomer'
import Loader from '../../components/Loader'
import { useGetPcsQuery } from './pcApiSlice'
import { Col, Row, Table } from 'react-bootstrap'

const Home = () => {
    const {
        data: userPcs,
        isLoading,
        isSuccess,
        // isError,
        // error
    } = useGetPcsQuery('pcList', {
        // pollingInterval: 15000,
        // refetchOnFocus: true,
        // refetchOnMountOrArgChange: true
    })

    if (isLoading) return <Loader />

    if (isSuccess) {
        const { ids } = userPcs

        const content = ids?.length > 0 && ids.map((pcId, index) => (<PcItem key={pcId} pcId={pcId} index={index} />))

        return (
            <Row className='m-auto'>
                <Col md={10} sm={12} className='m-auto'>
                    <div className="d-flex justify-content-evenly align-items-center mt-5">
                        <AddCustomer />
                        <SpendMoney />
                    </div>
                    {
                        content.length > 0 ?
                            <Table bordered hover variant='dark' className='mt-5'>
                                <thead>
                                    <tr className='text-center'>
                                        <th>#</th>
                                        <th>Recive Money</th>
                                        <th>PC</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Is Wifi</th>
                                        <th>Speed</th>
                                        <th>Mobile</th>
                                        <th>Mobil-Speed</th>
                                        <th>Passed Time</th>
                                        <th>Is Generator</th>
                                        <th>Code</th>
                                        <th>Total Money</th>
                                        <th>Date</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                            </Table>
                            :
                            <h4 className='d-flex justify-content-center align-items-center mt-5'>No PC Exist!</h4>
                    }
                </Col>
            </Row>
        )
    }
}

export default Home