import React, { useEffect } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { useGetPcsQuery } from './pcApiSlice'
import UserPc from '../../utils/schema/UserPc'
import { IoIosSpeedometer } from 'react-icons/io'
import { useUpdatePcMutation } from './pcApiSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams, useNavigate } from 'react-router-dom'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { Container, Row, Col, Form, InputGroup, Spinner, Button } from 'react-bootstrap'

const EditPc = () => {
    const { id } = useParams()

    const { pc } = useGetPcsQuery('pcList', {
        selectFromResult: ({ data }) => ({
            pc: data?.entities[id],
        }),
    })

    const navigate = useNavigate()

    const pcNumbers = new Map()
    pcNumbers.set('1', { label: 'pc-1', value: '1' },)
    pcNumbers.set('2', { label: 'pc-2', value: '2' },)
    pcNumbers.set('3', { label: 'pc-3', value: '3' },)
    pcNumbers.set('4', { label: 'pc-4', value: '4' },)
    pcNumbers.set('5', { label: 'pc-5', value: '5' },)
    pcNumbers.set('6', { label: 'pc-6', value: '6' },)
    pcNumbers.set('7', { label: 'pc-7', value: '7' },)
    pcNumbers.set('8', { label: 'pc-8', value: '8' },)

    const wifiSpeedVlaue = new Map()
    wifiSpeedVlaue.set('1', { label: '1 MB', value: '1' })
    wifiSpeedVlaue.set('1.5', { label: '1.5 MB', value: '1.5' })
    wifiSpeedVlaue.set('2', { label: '2 MB', value: '2.5' })
    wifiSpeedVlaue.set('2.5', { label: '2.5 MB', value: '2.5' })
    wifiSpeedVlaue.set('3', { label: '3 MB', value: '3' })
    wifiSpeedVlaue.set('3.5', { label: '3.5 MB', value: '3.5' })

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: 'onChange',
        defaultValues:
            { pc: pcNumbers.get(pc?.pc), code: pc?.code, speed: wifiSpeedVlaue.get(pc?.speed), mobileSpeed: wifiSpeedVlaue.get(pc?.speed) },
        resolver: yupResolver(UserPc),
    })

    const [updatePc, { isLoading }] = useUpdatePcMutation()

    const isGenerator = useWatch({ control, name: 'isGenerator', defaultValue: pc?.isGenerator })
    const isUsingWifi = useWatch({ control, name: 'isUsingWifi', defaultValue: pc?.isUsingWifi })
    const isUsingMobileWifi = useWatch({ control, name: 'isUsingMobileWifi', defaultValue: pc?.isUsingMobileWifi })

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

    useEffect(() => {
        !isUsingWifi && setValue('speed', '', { shouldTouch: true })

        !isUsingMobileWifi && setValue('mobileSpeed', '', { shouldTouch: true })

    }, [isUsingWifi, isUsingMobileWifi])

    const onSubmitHandler = async (data) => {
        try {
            data.pc = data.pc.value
            data.speed = isUsingWifi && data.speed.value
            data.mobileSpeed = isUsingMobileWifi && data.mobileSpeed.value

            await updatePc({ id: pc?.id, data }).unwrap();
            toast.success('PC Updated Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            reset()
            navigate('/')

        } catch (rejectResp) {
            const { data } = rejectResp;

            if (data?.errors) {
                data.errors.forEach((error) =>
                    setError(error['param'], { type: 'manual', message: error['msg'] })
                );
            } else {
                toast.error('Something went wrong', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
            }
        }
    };

    return (
        <section className='mt-5'>
            <Container>
                <Row className='align-items-center'>
                    <Col>
                        <h3 className='text-center my-5'>Edit Pc Details</h3>
                    </Col>

                    <Form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Row>
                            <Col lg={6} md={6} sm={12} className='my-3'>
                                <Form.Group controlId='pc'>
                                    <Form.Label className='fw-bold'>Select PC</Form.Label>
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
                            </Col>

                            <Col lg={6} md={6} sm={12} className='my-3'>
                                <Form.Group controlId='page-code'>
                                    <Form.Label className='fw-bold'>Page Code</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text
                                            className='addon-icon'
                                            id='basic-addon1'
                                        >
                                            <IoIosSpeedometer size={20} color='#00b8a5' />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type='number'
                                            {...register('code', { required: true })}
                                            name='code'
                                            className={`py-2 ${errors.code && 'is-invalid'
                                                }`}
                                            placeholder='Write Page Code'
                                        ></Form.Control>
                                    </InputGroup>
                                    <p className='small text-danger pt-1'>
                                        {errors.code?.message}
                                    </p>
                                </Form.Group>
                            </Col>

                            <Col lg={12} md={12} sm={12} className='my-4'>
                                <Form.Check
                                    label='Is using isGenerator ?'
                                    name='isGenerator'
                                    className='fw-bold'
                                    id='isGenerator'
                                    checked={isGenerator}
                                    {...register('isGenerator')}
                                    aria-label='isGenerator'
                                />
                            </Col>

                            <Col lg={6} md={6} sm={12} className='my-4'>
                                <Form.Check
                                    label="Is using Mobile Wifi ?"
                                    name="isUsingMobileWifi"
                                    className='fw-bold'
                                    id="isUsingMobileWifi"
                                    checked={isUsingMobileWifi}
                                    {...register("isUsingMobileWifi")}
                                    aria-label="isUsingMobileWifi"
                                />
                            </Col>

                            <Col lg={6} md={6} sm={12} className='my-1'>
                                {isUsingMobileWifi
                                    &&
                                    <Form.Group controlId='mobileSpeed' className='my-3'>
                                        <Form.Label className='fw-bold'>Select Mobile Wifi Speed</Form.Label>
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
                                }
                            </Col>

                            <Col lg={6} md={6} sm={12} className='my-4'>
                                <Form.Check
                                    label='Is using Wifi ?'
                                    name='isUsingWifi'
                                    className='fw-bold'
                                    id='isUsingWifi'
                                    checked={isUsingWifi}
                                    {...register('isUsingWifi')}
                                    aria-label='isUsingWifi'
                                />
                            </Col>

                            <Col lg={6} md={6} sm={12} className='my-1'>
                                {isUsingWifi
                                    ?
                                    <Form.Group controlId='Speed'>
                                        <Form.Label className='fw-bold'>Select Wifi Speed</Form.Label>
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
                                                        className={`react-select ${errors.speed?.label?.message && 'border border-danger'
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
                                    :
                                    <Button type='submit' className='w-100 fw-bold' variant='primary' disabled={isLoading}>
                                        {isLoading ? <Spinner /> : 'UPDATE PC'}
                                    </Button>
                                }
                            </Col>

                            {isUsingWifi && <Col lg={6} md={6} sm={12} className='my-5 m-auto'>
                                <Button type='submit' className='w-100 fw-bold' variant='primary' disabled={isLoading}>
                                    {isLoading ? <Spinner /> : 'UPDATE PC'}
                                </Button>
                            </Col>
                            }
                        </Row>
                    </Form>
                </Row>
            </Container>
        </section>
    )
}

export default EditPc