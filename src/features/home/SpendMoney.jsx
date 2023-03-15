import React, { useState } from 'react'
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form'
import { useAddPcMutation } from './pcApiSlice'
import { IoIosSpeedometer } from 'react-icons/io'
import { yupResolver } from '@hookform/resolvers/yup'
import SpendMoneySchema from '../../utils/schema/SpendMoneySchema'
import { Button, Spinner, Form, InputGroup, Modal } from 'react-bootstrap'

const SpendMoney = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(SpendMoneySchema),
    })

    const [addPc] = useAddPcMutation()

    const onSubmitHandler = async (data) => {
        try {
            await addPc(data).unwrap();
            toast.success("Spend-Money Add Successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setShow(false)
            reset()

        } catch (rejectResp) {
            const { data } = rejectResp;

            if (data?.errors) {
                data.errors.forEach((error) =>
                    setError(error["param"], { type: "manual", message: error["msg"] })
                );
            } else {
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        }
    };

    return (
        <section className='d-flex justify-content-center align-items-center'>
            <Button variant='primary' className='px-5 my-2 fw-bold' onClick={handleShow}>
                ADD SPEND MONEY
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}  >
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Enter Spend Money Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Form.Group controlId="SpendMoneyDesc">
                            <Form.Label className="fw-bold">Message</Form.Label>
                            <Form.Control
                                as="textarea" rows={10}
                                size="md"
                                type="text"
                                {...register("SpendMoneyDesc", { required: true })}
                                name="SpendMoneyDesc"
                                placeholder="Explain what this money was taken for?"
                                className={`text-area ${(errors.SpendMoneyDesc) && "is-invalid"
                                    }`}
                            ></Form.Control>
                            <p className="small required-msg  text-danger">
                                {errors.SpendMoneyDesc?.message}
                            </p>
                        </Form.Group>

                        <Form.Group controlId="spend-money">
                            <Form.Label className="fw-bold">
                                Spend Money
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text
                                    className="addon-icon"
                                    id="spendMoney"
                                >
                                    <IoIosSpeedometer size={20} color="#00b8a5" />
                                </InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    {...register("spendMoney", { required: true })}
                                    name="spendMoney"
                                    className={`py-2 ${errors.spendMoney && "is-invalid"
                                        }`}
                                    placeholder="Write Price Of spendMoney"
                                ></Form.Control>
                            </InputGroup>
                            <p className="small text-danger pt-1">
                                {errors.spendMoney?.message}
                            </p>
                        </Form.Group>

                        <Button type='submit' className='w-100' variant='primary' disabled={isSubmitting}>
                            {isSubmitting ? <Spinner /> : "ADD SPEND MONEY"}
                        </Button>
                    </Form >
                </Modal.Body>
            </Modal>
        </section>

    )
}

export default SpendMoney