import React, { useState } from "react"
import { Container, Navbar, Image } from "react-bootstrap"
import { MdShoppingCart, MdNotifications } from "react-icons/md"
import { AiOutlineMenu } from "react-icons/ai"
import rahaLogo from "../../../assets/images/logo/rahanet-transparent.png"
import SideBar from "./SideBar"
import { Link } from "react-router-dom"

const MediumNavbar = () => {
	const [show, setShow] = useState(false)
	const [showIcon, setShowIcom] = useState(false)

	const toggleNavbar = () => {
		setShow(!show)

		setTimeout(() => {
			setShowIcom(!showIcon)
		}, 1000)
	}

	return (
		<>
			<Navbar
				className="md-navbar d-flex justify-content-between align-items-center"
				sticky="top"
			>
				<Navbar.Brand>
					<Container>
						<Link to='/'>
							<Image src={rahaLogo} alt="Rahanet ISP" />
						</Link>
					</Container>
				</Navbar.Brand>

				<div className="d-flex justify-content-between align-items-center">
					{/* <MdNotifications size={20} color="white" /> */}
					<MdShoppingCart size={20} color="white" className="mx-3" />
					<AiOutlineMenu
						size={20}
						color="white"
						className="border mx-3"
						onClick={toggleNavbar}
					/>
				</div>
			</Navbar>

			{/* {showIcon && show && (
				<FaAngleRight
					size={20}
					color="white"
					className="border mx-4 nav-close-angle"
					onClick={toggleNavbar}
				/>
			)} */}
			<SideBar show={show} setShow={toggleNavbar} />
		</>
	)
}

export default MediumNavbar
