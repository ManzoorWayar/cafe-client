import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import useAuth from '../../hooks/UseAuth'
import { AiFillHome } from 'react-icons/ai'
import { DiGoogleAnalytics } from 'react-icons/di'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import ROMANNET_LOGO from '../../assets/images/logo.png'
import { Navbar, Container, Nav, Image } from 'react-bootstrap'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

const Header = () => {

    const { isAuth } = useAuth()

    const navigate = useNavigate()

    const [sendLogout] = useSendLogoutMutation()

    const handleLogout = () => {
        sendLogout()
        navigate('/auth/login')
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' sticky='top' collapseOnSelect>
                <Container>
                    <Image className='me-2' src={ROMANNET_LOGO} alt='Roman-Net logo' width={50} />
                    <LinkContainer to='/'>
                        <Navbar.Brand>Roman Net</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    {
                        isAuth &&
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='me-auto'>
                                <NavLink to="/">
                                    {({ isActive }) => (
                                        <AiFillHome
                                            color="white"
                                            className={`ms-5 my-2 ${isActive && "active-li"}`}
                                            size={30}
                                        />
                                    )}
                                </NavLink>
                                <NavLink to="/analytics">
                                    {({ isActive }) => (
                                        <DiGoogleAnalytics
                                            color="white"
                                            className={`ms-5 my-2 ${isActive && "active-li"}`}
                                            size={30}
                                        />
                                    )}
                                </NavLink>
                            </Nav>
                            <Nav>
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