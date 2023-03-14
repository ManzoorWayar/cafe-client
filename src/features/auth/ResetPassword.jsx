import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import VerificationInput from "react-verification-input";
import ROMANNET_LOGO from '../../assets/images/logo.png'
import { Container, Row, Col, Card, Form, InputGroup, Button, Spinner, Image } from 'react-bootstrap'
import { useResetPasswordMutation, useResendMutation } from './authApiSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { FaLock } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import ResetPasswordSchema from "../../utils/schema/ResetPassword"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [otpCode, setOTPCode] = useState(null);
    const { t } = useTranslation()

    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.auth)

    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const [resend] = useResendMutation()

    const onChange = (code) => setOTPCode(code);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(ResetPasswordSchema),
    })

    useEffect(() => {
        if (
            userInfo &&
            userInfo.hasOwnProperty('accessToken')
        ) navigate("/");

    }, [userInfo, navigate]);
    console.log(userInfo);
    const resendHandler = async (e) => {
        e.preventDefault()

        try {
            await resend({ email: userInfo.email }).unwrap()
        } catch (rejectResp) {
            toast.error(t("messages:failed"), {
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

    const onSubmitHandler = async (data) => {
        try {
            data.email = userInfo.email;
            data.otpCode = otpCode;

            const userData = await resetPassword(data).unwrap()
            if (userData.success) return navigate('/auth/login')

            reset()

        } catch (rejectResp) {
            const { data } = rejectResp

            if (data?.errors) {
                data.errors.forEach(error => setError(error["param"], { type: "manual", message: error["msg"] }))
            } else {
                toast.success(t(data?.message), {
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
        <section >
            <Container className="auth-form">
                <Row className="auth-row">
                    <Col xl={6} lg={6} md={6} sm={12} className="m-auto my-1">
                        <Card body>
                            <Card.Title className='text-center mb-3 fw-bold'>
                                <Image src={ROMANNET_LOGO} alt={t("logo")} className="card-img-top auth-img" />
                            </Card.Title>
                            <h3 className='text-center'>{t("verify-otp")}</h3>

                            <Card.Text className="mb-4 text-muted text-center">
                                {t("messages:verify-otp", { key: t("email") })}.
                            </Card.Text>

                            <div className='m-auto '>
                                <VerificationInput
                                    classNames={{
                                        container: "m-auto",
                                        character: "d",
                                        characterInactive: "character--inactive",
                                        characterSelected: "character--selected",
                                    }}
                                    validChars="0-9"
                                    placeholder="_"
                                    length={6}
                                    autoFocus={true}
                                    onChange={onChange}
                                />
                            </div>

                            <Card.Text className='text-center mt-4'>
                                {t("messages:not-received-token")}
                                <span className='resend mx-2 p-1' onClick={resendHandler}>{t("emails:resend")}</span>
                            </Card.Text>

                            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                                <Row>
                                    <Col lg={6} md={6} sm={6} className="my-3">
                                        <Form.Group controlId="newPassword">
                                            <Form.Label className='fw-bold'>{t("new-password")}</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text className="addon-icon" id="">
                                                    <BsFillShieldLockFill size={20} color='#00b8a5' />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="password"
                                                    size="md"
                                                    {...register("newPassword", { required: true })}
                                                    name="newPassword"
                                                    className={`py-2 ${errors.newPassword && "is-invalid"
                                                        }`}
                                                    placeholder={t("new-password")}
                                                ></Form.Control>
                                            </InputGroup>

                                            <p className="small text-danger ">
                                                {errors.newPassword?.message}
                                            </p>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} md={6} sm={6} className="my-3">
                                        <Form.Group controlId="confirmPassword">
                                            <Form.Label className='fw-bold'>{t("confirm-password")}</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text className="addon-icon" id="">
                                                    <FaLock size={20} color='#00b8a5' />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="password"
                                                    size="md"
                                                    {...register("confirmPassword", { required: true })}
                                                    name="confirmPassword"
                                                    className={`py-2 ${errors.confirmPassword && "is-invalid"
                                                        }`}
                                                    placeholder={t("confirm-password")}
                                                ></Form.Control>
                                            </InputGroup>

                                            <p className="small text-danger">
                                                {errors.confirmPassword?.message}
                                            </p>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="m-auto">
                                        <Button type="submit" className="btn w-100 btn-submit" disabled={isSubmitting}>
                                            {isLoading ? <Spinner /> : t("emails:verify-now")}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default ResetPassword