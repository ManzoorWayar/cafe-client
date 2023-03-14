import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { yupResolver } from "@hookform/resolvers/yup"
import ROMANNET_LOGO from '../../assets/images/logo.png'
import LoginSchema from "../../utils/schema/LoginSchema"
import { Container, Row, Col, Card, Form, InputGroup, Button, Spinner, Image } from 'react-bootstrap'
import { BsEnvelopeFill, BsFillShieldLockFill } from 'react-icons/bs'
import { useLoginMutation } from './authApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from './authSlice'
import usePersist from '../../hooks/usePersist'
import { toast } from 'react-toastify'

const Login = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [persist, setPersist] = usePersist()

    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (
            userInfo && userInfo.hasOwnProperty('accessToken')
        ) navigate("/");

    }, [userInfo, navigate]);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(LoginSchema),
    })

    const [login, { isLoading }] = useLoginMutation()

    const handleToggle = () => setPersist(prev => !prev)

    const onSubmitHandler = async (data) => {
        try {
            const userData = await login(data).unwrap()
            console.log({ userData });
            dispatch(setCredentials({ ...userData }))
            navigate('/')
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
        <section>
            <Container className="auth-form">
                <Row className="auth-row">
                    <Col xl={5} lg={5} md={5} sm={12} className="m-auto my-1">
                        <Card body>
                            <Card.Title className='text-center mb-3 fw-bold'>
                                <Image src={ROMANNET_LOGO} alt={t("login")} className="card-img-top auth-img" />
                            </Card.Title>
                            <Card.Text className="mb-4 text-muted text-center">{t("please-login-account")}</Card.Text>

                            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                                <Row>
                                    <Col lg={12} md={12} sm={12}>
                                        <Form.Group controlId="email">
                                            <Form.Label className='fw-bold'>{t("email")}</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text className="addon-icon" id="basic-addon1">
                                                    <BsEnvelopeFill size={20} color='#00b8a5' />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="text"
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

                                    <Col lg={12} md={12} sm={12} className="my-3">
                                        <Form.Group controlId="password">
                                            <div className='d-flex justify-content-between'>
                                                <Form.Label className='fw-bold'>{t("password")}</Form.Label>
                                                <Link to='/auth/forgot-password'>{t("forgot-password")}</Link>
                                            </div>
                                            <InputGroup>
                                                <InputGroup.Text className="addon-icon" id="">
                                                    <BsFillShieldLockFill size={20} color='#00b8a5' />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="password"
                                                    size="md"
                                                    {...register("password", { required: true })}
                                                    name="password"
                                                    className={`py-2 ${errors.password && "is-invalid"
                                                        }`}
                                                    placeholder={t("password")}
                                                ></Form.Control>
                                            </InputGroup>

                                            <p className="small text-danger ">
                                                {errors.password?.message}
                                            </p>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={12} md={12} sm={12}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Form.Check
                                                reverse
                                                type="checkbox"
                                                label={t("remember-me")}
                                                name="remember-me"
                                                id="remember-me"
                                                onChange={handleToggle}
                                                checked={persist}
                                            />
                                        </div>
                                    </Col>

                                    <Col md={6} className="m-auto">
                                        <Button type="submit" className="btn w-100 mt-4 btn-submit" disabled={isSubmitting}>
                                            {isLoading ? <Spinner /> : t("login")}
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

export default Login