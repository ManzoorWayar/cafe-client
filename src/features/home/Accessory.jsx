import React from 'react'
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form'
import { useAddPcMutation } from './pcApiSlice'
import { IoIosSpeedometer } from 'react-icons/io'
import { yupResolver } from '@hookform/resolvers/yup'
import AccessorySchema from '../../utils/schema/AccessorySchema'
import { Button, Spinner, Form, InputGroup } from 'react-bootstrap'

const Accessory = ({ setShow }) => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(AccessorySchema),
    })

    const [addPc] = useAddPcMutation()

    const onSubmitHandler = async (data) => {
        try {
            data.totalAmount = data.accessory

            await addPc(data).unwrap();
            toast.success("Accessory Add Successfully", {
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
                {isSubmitting ? <Spinner /> : "ADD ACCESSORY"}
            </Button>
        </Form >
    )
}

export default Accessory