import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FiLogOut } from 'react-icons/fi'
import { AiFillHome } from 'react-icons/ai'
import { DiGoogleAnalytics } from 'react-icons/di'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

const Header = () => {

    const userInfo = {
        name: 'Manzoor'
    }

    const navigate = useNavigate()

    const [sendLogout] = useSendLogoutMutation()

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' sticky='top' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Roman Net</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
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
                            <FiLogOut size='30' color='white' cursor='pointer' onClick={sendLogout} />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header