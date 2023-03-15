import React, { useState } from 'react'
import Select from 'react-select'
import { toast } from "react-toastify"
import { IoIosSpeedometer } from 'react-icons/io'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAddPcMutation } from './pcApiSlice'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Button, Spinner, Form, InputGroup, Modal, Tabs, Tab } from 'react-bootstrap'

import Accessory from './Accessory'
import UserPc from '../../utils/schema/UserPc'

const AddCustomer = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(UserPc),
    })

    const [addPc, { error }] = useAddPcMutation()

    useWatch({ control, name: 'isGenerator', defaultValue: false })
    const isUsingWifi = useWatch({ control, name: 'isUsingWifi', defaultValue: false })
    const isUsingMobileWifi = useWatch({ control, name: 'isUsingMobileWifi', defaultValue: false })

    const PcOptions = [
        { label: 'pc-1', value: '1' },
        { label: 'pc-2', value: '2' },
        { label: 'pc-3', value: '3' },
        { label: 'pc-4', value: '4' },
        { label: 'pc-5', value: '5' },
        { label: 'pc-6', value: '6' },
        { label: 'pc-7', value: '7' },
        { label: 'pc-8', value: '8' },
    ]

    const wifiSpeed = [
        { label: '1 MB', value: '1' },
        { label: '1.5 MB', value: '1.5' },
        { label: '2 MB', value: '2' },
        { label: '2.5 MB', value: '2.5' },
        { label: '3 MB', value: '3' },
        { label: '3.5 MB', value: '3.5' },
    ]

    const onSubmitHandler = async (data) => {
        try {
            data.pc = data.pc.value
            data.speed = isUsingWifi && data.speed.value
            data.mobileSpeed = isUsingMobileWifi && data.mobileSpeed.value
            data.mobileFrom = isUsingMobileWifi ? new Date() : null

            await addPc(data).unwrap();
            toast.success("PC Add Successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            reset()
            setShow(false)
            // reset({
            //     pc: { label: 'Select A PC', value: '' },
            //     code: '',
            //     speed: ''
            // });
            // navigate("/");
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
                ADD PC USER
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}  >
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Enter User PC Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="ShareFile-WiFi"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="ShareFile-WiFi" title="ShareFile-WiFi">
                            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                                <Form.Group controlId='pc'>
                                    <Form.Label>Select PC</Form.Label>
                                    <Controller
                                        name='pc'
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    controlShouldRenderValue={true}
                                                    options={PcOptions}
                                                    id='pc'
                                                    name='pc'
                                                    defaultValue={{ label: 'Select A PC', value: 'Select A PC' }}
                                                    placeholder='Select A PC'
                                                    className={`react-select ${errors.pc?.label?.message && 'border border-danger'
                                                        }`}
                                                    classNamePrefix='select'
                                                    errorText={true}
                                                    value={null}
                                                    aria-invalid={errors.pc?.label?.message && true}
                                                    aria-errormessage='is-invalid'
                                                    {...field}
                                                />
                                            )
                                        }}
                                    />
                                    <p className='small text-danger pt-1'>
                                        {errors.pc?.label?.message}
                                    </p>
                                </Form.Group>

                                <Form.Check
                                    label="Is using Wifi ?"
                                    name="isUsingWifi"
                                    id="isUsingWifi"
                                    {...register("isUsingWifi")}
                                    aria-label="isUsingWifi"
                                />

                                {isUsingWifi && (
                                    <Form.Group controlId='Speed' className='my-3'>
                                        <Controller
                                            name='speed'
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        controlShouldRenderValue={true}
                                                        options={wifiSpeed}
                                                        id='speed'
                                                        name='speed'
                                                        placeholder='Select Wifi Speed'
                                                        className={`  react-select ${errors.speed?.label?.message && 'border border-danger'
                                                            }`}
                                                        classNamePrefix='select'
                                                        errorText={true}
                                                        aria-invalid={errors.speed?.label?.message && true}
                                                        aria-errormessage='speed-invalid'
                                                        {...field}
                                                    />
                                                )
                                            }}
                                        />
                                        <p className='small text-danger pt-1'>
                                            {errors.speed?.label?.message}
                                        </p>
                                    </Form.Group>
                                )}

                                <Form.Group controlId="page-code">
                                    <Form.Label className="fw-bold mt-3">
                                        Page  Code
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text
                                            className="addon-icon"
                                            id="basic-addon1"
                                        >
                                            <IoIosSpeedometer size={20} color="#00b8a5" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            {...register("code", { required: true })}
                                            name="code"
                                            className={`py-2 ${errors.code && "is-invalid"
                                                }`}
                                            placeholder="Write Page Code"
                                        ></Form.Control>
                                    </InputGroup>
                                    <p className="small text-danger pt-1">
                                        {errors.code?.message}
                                    </p>
                                </Form.Group>

                                <Form.Check
                                    label="Is using Mobile Wifi ?"
                                    name="isUsingMobileWifi"
                                    id="isUsingMobileWifi"
                                    {...register("isUsingMobileWifi")}
                                    className='mb-2'
                                    aria-label="isUsingMobileWifi"
                                />

                                {isUsingMobileWifi && (
                                    <Form.Group controlId='mobileSpeed' className='my-3'>
                                        <Controller
                                            name='mobileSpeed'
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        controlShouldRenderValue={true}
                                                        options={wifiSpeed}
                                                        id='mobileSpeed'
                                                        name='mobileSpeed'
                                                        placeholder='Select Mobile Wifi Speed'
                                                        className={`  react-select ${errors.mobileSpeed?.label?.message && 'border border-danger'
                                                            }`}
                                                        classNamePrefix='select'
                                                        errorText={true}
                                                        aria-invalid={errors.mobileSpeed?.label?.message && true}
                                                        aria-errormessage='speed-invalid'
                                                        {...field}
                                                    />
                                                )
                                            }}
                                        />
                                        <p className='small text-danger pt-1'>
                                            {errors.mobileSpeed?.label?.message}
                                        </p>
                                    </Form.Group>
                                )}

                                <Form.Check
                                    label="Is using Generator ?"
                                    name="isGenerator"
                                    id="isGenerator"
                                    {...register("isGenerator")}
                                    className='mb-2'
                                    aria-label="isGenerator"
                                />

                                <Button type='submit' className='w-100' variant='primary' disabled={isSubmitting}>
                                    {isSubmitting ? <Spinner /> : "ADD PC"}
                                </Button>
                            </Form>
                        </Tab>

                        <Tab eventKey="accessory" title="Accessory">
                            <Accessory setShow={setShow} />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default AddCustomer