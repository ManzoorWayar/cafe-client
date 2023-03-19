import React from 'react'
import Swal from 'sweetalert2'
import { MdAutoDelete } from 'react-icons/md'
import { useDeletePcMutation, } from './pcApiSlice'
import { Col, Badge, ListGroup } from 'react-bootstrap'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const SpendItem = ({ item, index }) => {
    const { SpendMoneyDesc, spendMoney } = item

    const [delPc] = useDeletePcMutation()

    const handleDelPc = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await delPc(item?.id)
            }
        })
    }

    return (
        <Col lg={6} md={6} sm={12} className='m-auto mt-5'>
            <ListGroup as="ol">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <Badge bg="success" pill>
                        {`${item?.creatorId?.firstName} ${item?.creatorId?.lastName}`}
                    </Badge>
                    <MdAutoDelete title='Delete' color='red' size='20' cursor='pointer' onClick={handleDelPc} />
                </div>

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
                        {spendMoney} afg
                    </Badge>
                </ListGroup.Item>
            </ListGroup>
        </Col >
    )
}

export default SpendItem