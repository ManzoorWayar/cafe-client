import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import useAuth from '../../hooks/UseAuth'
import { useSelector } from 'react-redux'
import { AiFillHome } from 'react-icons/ai'
import { DiGoogleAnalytics } from 'react-icons/di'
import { TbReportAnalytics } from 'react-icons/tb'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import ROMANNET_LOGO from '../../assets/images/logo.png'
import { Navbar, Container, Nav, Image } from 'react-bootstrap'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

const Header = () => {

    const { isAuth } = useAuth()

    const { userInfo } = useSelector(state => state.auth)

    const navigate = useNavigate()

    const [sendLogout] = useSendLogoutMutation()

    const handleLogout = () => {
        sendLogout()
        navigate('/auth/login')
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' sticky='top' collapseOnSelect>
                <Container className='flex-column flex-lg-row flex-xl-row'>
                    <div className='d-flex'>
                        <Image className='me-2' src={ROMANNET_LOGO} alt='Roman-Net logo' width={50} />
                        <LinkContainer to='/'>
                            <Navbar.Brand>Roman Net</Navbar.Brand>
                        </LinkContainer>
                    </div>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    {
                        isAuth &&
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='m-auto d-flex justify-content-center align-items-center gap-4'>
                                <NavLink to='/'>
                                    {({ isActive }) => (
                                        <AiFillHome
                                            color='white'
                                            className={`my-2 ${isActive && 'active-li'}`}
                                            size={30}
                                            title='Home'
                                        />
                                    )}
                                </NavLink>
                                <NavLink to='/analytics'>
                                    {({ isActive }) => (
                                        <DiGoogleAnalytics
                                            color='white'
                                            className={`my-2 ${isActive && 'active-li'}`}
                                            size={30}
                                            title='Analytics'
                                        />
                                    )}
                                </NavLink>
                                <NavLink to='/report'>
                                    {({ isActive }) => (
                                        <TbReportAnalytics
                                            color='white'
                                            className={`my-2 ${isActive && 'active-li'}`}
                                            size={30}
                                            title='Report'
                                        />
                                    )}
                                </NavLink>
                            </Nav>
                            <Nav>
                                <h6 className='fw-bold text-white mx-2'>{`${userInfo?.firstName} ${userInfo?.lastName}`}</h6>
                                <FiLogOut size='30' color='white' cursor='pointer' onClick={handleLogout} />
                            </Nav>
                        </Navbar.Collapse>
                    }
                </Container>
            </Navbar>
        </header>
    )
}

export default Header