import React from 'react'
import { toast } from 'react-toastify'
import { useForm, } from 'react-hook-form'
import { useGetPcsQuery } from './pcApiSlice'
import { IoIosSpeedometer } from 'react-icons/io'
import { useUpdatePcMutation } from './pcApiSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams, useNavigate } from 'react-router-dom'
import AccessorySchema from '../../utils/schema/AccessorySchema'
import { Container, Row, Col, Form, InputGroup, Spinner, Button } from 'react-bootstrap'

const EditAccessory = () => {
    const { id } = useParams()

    const { pc } = useGetPcsQuery('pcList', {
        selectFromResult: ({ data }) => ({
            pc: data?.entities[id],
        }),
    })

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: 'onChange',
        defaultValues:
            { message: pc?.message, accessory: pc?.totalAmount },
        resolver: yupResolver(AccessorySchema),
    })

    const [updatePc] = useUpdatePcMutation()

    const onSubmitHandler = async (data) => {
        try {
            data.totalAmount = data.accessory

            await updatePc({ id: pc?.id, data }).unwrap();
            toast.success('Accessory Updated Successfully', {
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
            console.log(data);
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
                        <h3 className='text-center my-5'>Edit Accessory Details</h3>
                    </Col>

                    <Form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Form.Group controlId="message">
                            <Form.Label className="resize">Message</Form.Label>
                            <Form.Control
                                as="textarea" rows={10}
                                size="md"
                                type="text"
                                {...register("message", { required: true })}
                                name="message"
                                placeholder="message"
                                className={`text-area ${(errors.message) && "is-invalid"
                                    }`}
                            ></Form.Control>
                            <p className="small required-msg  text-danger">
                                {errors.message?.message}
                            </p>
                        </Form.Group>

                        <Form.Group controlId="price-accessory">
                            <Form.Label className="fw-bold">
                                Price  Accessory
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
                                    {...register("accessory", { required: true })}
                                    name="accessory"
                                    className={`py-2 ${errors.accessory && "is-invalid"
                                        }`}
                                    placeholder="Write Price Of Accessory"
                                ></Form.Control>
                            </InputGroup>
                            <p className="small text-danger pt-1">
                                {errors.accessory?.message}
                            </p>
                        </Form.Group>

                        <Button type='submit' className='w-100' variant='primary' disabled={isSubmitting}>
                            {isSubmitting ? <Spinner /> : "EDIT ACCESSORY"}
                        </Button>
                    </Form >
                </Row>
            </Container>
        </section>
    )
}

export default EditAccessory