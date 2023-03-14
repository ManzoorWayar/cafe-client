import React from 'react'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { BsEnvelopeFill } from "react-icons/bs"
import { yupResolver } from "@hookform/resolvers/yup"
import ROMANNET_LOGO from '../../assets/images/logo.png'
import { setCredentials } from './authSlice'
import { useForgotPasswordMutation } from './authApiSlice'
import ForgotPasswords from "../../utils/schema/ForgotPassword"
import { Container, Row, Col, Card, Form, InputGroup, Button, Spinner, Image } from 'react-bootstrap'

const ForgotPassword = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [passwordReset, { isLoading }] = useForgotPasswordMutation()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(ForgotPasswords),
    })

    const onSubmitHandler = async (data) => {
        try {
            const userData = await passwordReset(data).unwrap()
            dispatch(setCredentials({ ...userData }))

            if (userData.success) return navigate('/auth/reset-password')

            reset()

        } catch (rejectResp) {
            const { data } = rejectResp

            if (data?.errors) {
                data.errors.forEach(error => setError(error["param"], { type: "manual", message: error["msg"] }))
            } else {
                toast.error(t(data?.message), {
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
    }

    return (
        <section  >
            <Container className="auth-form">
                <Row className="auth-row">
                    <Col xl={6} lg={6} md={6} sm={12} className="m-auto my-1">
                        <Card body>
                            <Card.Title className='text-center mb-3 fw-bold'>
                                <Image src={ROMANNET_LOGO} alt={t("logo")} className="card-img-top auth-img" />
                            </Card.Title>
                            <h3 className='text-center'>{t("forgot-password")}</h3>

                            <Card.Text className="mb-4 text-muted text-center">
                                {t("messages:submit-email-forgot-password")}
                            </Card.Text>

                            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                                <Row>
                                    <Col lg={10} md={10} sm={12} className="m-auto">
                                        <Form.Group controlId="email">
                                            <Form.Label>{t("email")}</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text className="addon-icon" id="basic-addon1">
                                                    <BsEnvelopeFill size={20} color='#00b8a5' />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="email"
                                                    {...register("email", { required: true })}
                                                    name="email"
                                                    className={`py-2 ${errors.email && "is-invalid"
                                                        }`}
                                                    placeholder={t("email")}
                                                ></Form.Control>
                                            </InputGroup>

                                            <p className="small text-danger">
                                                {errors.email?.message}
                                            </p>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="m-auto">
                                        <Button type="submit" className="btn w-100 mt-4 btn-submit" disabled={isSubmitting}>
                                            {isLoading ? <Spinner /> : t("send")}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                        </Card>
                    </Col>
                </Row >
            </Container >
        </section >
    )
}

export default ForgotPassword