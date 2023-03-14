import React from "react"
import { Container, Nav, Navbar, Image, NavDropdown } from "react-bootstrap"
import { MdShoppingCart, MdMiscellaneousServices } from "react-icons/md"
import { GiCardDraw } from "react-icons/gi"
import { FaToolbox, FaBlog, FaQuoteLeft } from "react-icons/fa"
import { AiFillHome } from "react-icons/ai"
import rahaLogo from "../../../assets/images/logo/rahanet-transparent.png"
import Languages from "../Languages"
import { useTranslation } from "react-i18next"
import { LinkContainer } from "react-router-bootstrap"
import UserMenu from "../UserMenu"
import { NavLink } from "react-router-dom"
// import Notification from "../../common/Notification"
import { Link } from "react-router-dom"

const LargeNavbar = () => {
	const { t } = useTranslation()

	return (
		<Navbar className="xl-navbar" sticky="top">
			<Navbar.Brand>
				<Container>
					<Link to='/'>
						<Image src={rahaLogo} alt="Rahanet ISP" />
					</Link>
				</Container>
			</Navbar.Brand>
			<Navbar.Collapse>
				<header className="d-flex justify-content-between align-items-center w-100">
					<Nav className="nav-list d-flex gap-4 justify-content-center align-items-center w-100">
						<NavLink to="/">
							{({ isActive }) => (
								<span
									className={`d-flex flex-column flex-justify-content-center align-items-center li-inner ${isActive && "active-li"
										}`}
								>
									<AiFillHome
										color="white"
										className="navbar-icons"
										size={20}
									/>
									<Nav.Link href="/" className="my-1">
										{t("home")}
									</Nav.Link>
								</span>
							)}
						</NavLink>

						<span className="d-flex flex-column flex-justify-content-center align-items-center li-inner">
							<MdMiscellaneousServices
								className="navbar-icons"
								color="white"
								size={20}
							/>
							<NavDropdown
								title={t("services")}
								id="navbarDropdownServices"
								className="mt-1"
							>
								<LinkContainer to="/services/wireless">
									<NavDropdown.Item>{t("wireless")}</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/services/microwave">
									<NavDropdown.Item>Microwave</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/services/vsat">
									<NavDropdown.Item>{t("satellite-net")}</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/services/voip">
									<NavDropdown.Item>Voip</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/services/web-design">
									<NavDropdown.Item>{t("web-design")}</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/services/app-dev">
									<NavDropdown.Item>{t("app-dev")}</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						</span>

						<span className="d-flex flex-column flex-justify-content-center align-items-center li-inner">
							<GiCardDraw color="white" className="navbar-icons" size={20} />
							<NavDropdown
								title={t("packages")}
								className="mt-1"
								id="navbarDropdownPackages"
							>
								<LinkContainer to="packages/home">
									<NavDropdown.Item>{t("home-packages")}</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="packages/business">
									<NavDropdown.Item>{t("business-packages")}</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						</span>

						<span className="d-flex flex-column flex-justify-content-center align-items-center li-inner">
							<FaToolbox color="white" className="navbar-icons" size={20} />
							<NavDropdown
								title={t("tools")}
								id="navbarDropdownTools"
								className="mt-1"
							>
								<LinkContainer to="tools/subscriber/panel">
									<NavDropdown.Item>{t("subscriber-panel")}</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="tools/graph">
									<NavDropdown.Item>{t("graph")}</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="tools/speedtest">
									<NavDropdown.Item>{t("speed-test")}</NavDropdown.Item>
								</LinkContainer>
								{/* <LinkContainer to="join-us">
									<NavDropdown.Item>{t("work-with-us")}</NavDropdown.Item>
								</LinkContainer> */}
								<LinkContainer to="tools/critics">
									<NavDropdown.Item id="fills">
										{t("critics-suggestions")}
									</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						</span>

						<NavLink to="/blogs">
							{({ isActive }) => (
								<span
									className={`d-flex flex-column flex-justify-content-center align-items-center li-inner ${isActive && "active-li"
										}`}
								>
									<FaBlog color="white" size={20} className="navbar-icons" />
									<Nav.Link href="/blogs" className="mt-1">
										{t("blog")}
									</Nav.Link>
								</span>
							)}
						</NavLink>

						<NavLink to="/faqs">
							{({ isActive }) => (
								<span
									className={`d-flex flex-column flex-justify-content-center align-items-center li-inner ${isActive && "active-li"
										}`}
								>
									<FaQuoteLeft
										color="white"
										className="navbar-icons"
										size={20}
									/>
									<Nav.Link href="/faq" className="mt-1">
										{t("faq")}
									</Nav.Link>
								</span>
							)}
						</NavLink>
					</Nav>
					<Nav className="nav-options">
						<div className="cruve option-items gap-1 d-flex justify-content-around align-items-center">
							<UserMenu />
							<Languages />
							{/* <Notification /> */}
							<Link to='/coming'>
								<MdShoppingCart
									size={20}
									color="white"
									className="shopping-cart mr-1"
									id="shopping"
								/>
							</Link>
						</div>
					</Nav>
				</header>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default LargeNavbar
