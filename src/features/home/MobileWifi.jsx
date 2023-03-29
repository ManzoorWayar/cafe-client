import React from 'react'
import Select from 'react-select'
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useAddPcMutation } from './pcApiSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Spinner, Form } from 'react-bootstrap'
import MobileWifi from '../../utils/schema/MobileWifi'

const Accessory = ({ setShow }) => {

    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(MobileWifi),
    })

    const [addPc, { error }] = useAddPcMutation()

    const wifiSpeed = [
        { label: '1 MB', value: '1' },
        { label: '1.5 MB', value: '1.5' },
        { label: '2 MB', value: '2' },
        { label: '2.5 MB', value: '2.5' },
        { label: '3 MB', value: '3' },
        { label: '3.5 MB', value: '3.5' },
    ]
    console.log(error, errors);
    const onSubmitHandler = async (data) => {
        try {
            console.log(data);
            data.isUsingMobileWifi = true
            data.mobileSpeed = data.mobileSpeed.value
            data.mobileFrom = new Date()

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

        } catch (rejectResp) {
            const { data } = rejectResp;
            console.log(rejectResp);
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
                                className={`react-select ${errors.mobileSpeed?.label?.message && 'border border-danger'}`}
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

            <Button type='submit' className='w-100' variant='primary' disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "ADD ACCESSORY"}
            </Button>
        </Form >
    )
}

export default Accessory