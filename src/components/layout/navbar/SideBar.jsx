import React from "react"
import PropTypes from "prop-types"
import { Nav, ListGroup, Accordion } from "react-bootstrap"
import { MdMiscellaneousServices, MdCleanHands, MdWork } from "react-icons/md"
import { GiCardDraw, GiRadarDish } from "react-icons/gi"
import {
	FaToolbox,
	FaBlog,
	FaQuoteLeft,
	FaConnectdevelop,
	FaGamepad,
} from "react-icons/fa"
import { RiWirelessChargingFill, RiHomeHeartFill } from "react-icons/ri"
import { TbAntenna, TbSatellite } from "react-icons/tb"
import { IoIosBusiness, IoIosSpeedometer } from "react-icons/io"
import { MdEmojiPeople } from "react-icons/md"
import { SlGraph } from "react-icons/sl"
import { BsInfoCircleFill } from "react-icons/bs"
import { AiFillHome, AiOutlineAntDesign, AiFillPhone } from "react-icons/ai"
import SideBarCollapse from "../../common/SideBarCollapse"
import SidebarAccordionList from "../../common/SidebarAccordionList"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Languages from "../Languages"

const SideBar = ({ show, setShow }) => {
	const { t } = useTranslation()

	return (
		<Nav
			defaultActiveKey="/home"
			className={`sidebar flex-column ${show && "show"}`}
			as="ul"
		>
			<div>
				<div className="d-flex flex-column justify-content-center align-items-center mb-4">
					<div className="d-flex flex-column justify-content-center align-items-center sidebar-profile-accordion">
						<SideBarCollapse />
					</div>
				</div>
				<Nav.Item as="li" className="active-li">
					<div
						className="d-flex justify-content-between align-items-between li-items"
						onClick={setShow}
					>
						<Link to="/" className="d-flex">
							<AiFillHome size={15} className="mx-2 icon" />
							<h3 className="title mx-3">{t("home")}</h3>
						</Link>
					</div>
				</Nav.Item>
				<Nav.Item as="li" className="active-li">
					<div
						className="d-flex justify-content-between align-items-between li-items"
						onClick={setShow}
					>
						<Link to="/entertainment" className="d-flex">
							<FaGamepad size={15} className="mx-2 icon" />
							<h3 className="title mx-3">{t("entertainment")}</h3>
						</Link>
					</div>
				</Nav.Item>
				<div className="d-flex justify-content-center align-items-center sidebar-menu-accordion">
					<SidebarAccordionList>
						<Accordion.Header>
							<div className="d-flex justify-content-between align-items-center">
								<MdMiscellaneousServices
									size={15}
									className="accordion-header-icon"
								/>
								<h3 className="li-name">{t("services")}</h3>
							</div>
						</Accordion.Header>
						<Accordion.Body>
							<ListGroup as="ul">
								<Link to="/services/wireless" onClick={setShow}>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<RiWirelessChargingFill size={20} className="mx-2" />
										<span>{t("wireless")}</span>
									</ListGroup.Item>
								</Link>
								<Link to="/services/microwave" onClick={setShow}>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<GiRadarDish size={20} className="mx-2" />
										<span>Microwave</span>
									</ListGroup.Item>
								</Link>
								<Link to="/services/vsat" onClick={setShow}>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<TbSatellite size={20} className="mx-2" />
										<span>{t("satellite-net")}</span>
									</ListGroup.Item>
								</Link>
								<Link to="/services/voip" onClick={setShow}>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<TbAntenna size={20} className="mx-2" />
										<span>Voip</span>
									</ListGroup.Item>
								</Link>
								<Link to="/services/web-design" onClick={setShow}>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<AiOutlineAntDesign size={20} className="mx-2" />
										<span>{t("web-design")}</span>
									</ListGroup.Item>
								</Link>
								<Link to="/services/app-dev" onClick={setShow}>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<FaConnectdevelop size={20} className="mx-2" />
										<span>{t("app-dev")}</span>
									</ListGroup.Item>
								</Link>
							</ListGroup>
						</Accordion.Body>
					</SidebarAccordionList>
				</div>
				<div className="d-flex justify-content-center align-items-center sidebar-menu-accordion">
					<SidebarAccordionList>
						<>
							<Accordion.Header>
								<div className="d-flex justify-content-between align-items-center">
									<GiCardDraw size={15} className="accordion-header-icon" />
									<h3 className="li-name">{t("packages")}</h3>
								</div>
							</Accordion.Header>
							<Accordion.Body>
								<ListGroup as="ul">
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<Link to="/packages/home" onClick={setShow}>
											<RiHomeHeartFill size={20} className="mx-2" />
											<span>{t("home-packages")}</span>
										</Link>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<Link to="/packages/business" onClick={setShow}>
											<IoIosBusiness size={20} className="mx-2" />
											<span className="business-package">
												{t("business-packages")}
											</span>
										</Link>
									</ListGroup.Item>
								</ListGroup>
							</Accordion.Body>
						</>
					</SidebarAccordionList>
				</div>
				<div className="d-flex justify-content-center align-items-center sidebar-menu-accordion">
					<SidebarAccordionList>
						<>
							<Accordion.Header>
								<div className="d-flex justify-content-between align-items-center">
									<FaToolbox size={15} className="accordion-header-icon" />
									<h3 className="li-name">{t("tools")}</h3>
								</div>
							</Accordion.Header>
							<Accordion.Body>
								<ListGroup as="ul">
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<Link to="tools/subscriber/panel" onClick={setShow}>
											<MdEmojiPeople size={20} className="mx-2" />
											<span>{t("subscriber-panel")}</span>
										</Link>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<Link to="tools/graph" onClick={setShow}>
											<SlGraph size={20} className="mx-2" />
											<span>{t("graph")}</span>
										</Link>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<Link to="tools/speed-test" onClick={setShow}>
											<IoIosSpeedometer size={20} className="mx-2" />
											<span>{t("speed-test")}</span>
										</Link>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<Link to="/join-us" onClick={setShow}>
											<MdWork size={20} className="mx-2" />
											<span>{t("work-with-us")}</span>
										</Link>
									</ListGroup.Item>
									<ListGroup.Item
										as="li"
										className="d-flex justify-content-space align-items-center"
									>
										<Link to="/tools/critics" onClick={setShow}>
											<MdCleanHands size={20} className="mx-2" />
											<span className="cri-sug">
												{t("critics-suggestions")}
											</span>
										</Link>
									</ListGroup.Item>
								</ListGroup>
							</Accordion.Body>
						</>
					</SidebarAccordionList>
				</div>
				<Nav.Item as="li" className="active-li my-3">
					<div className="d-flex justify-content-between align-items-between li-items">
						<Link to="/blogs" className="d-flex" onClick={setShow}>
							<FaBlog size={15} className="mx-2 icon" />
							<h3 className="title mx-3">{t("blog")}</h3>
						</Link>
					</div>
				</Nav.Item>
				<Nav.Item as="li" className="active-li">
					<div className="d-flex justify-content-between align-items-between li-items">
						<Link to="/faqs" className="d-flex" onClick={setShow}>
							<FaQuoteLeft size={15} className="mx-2 icon" />
							<h3 className="title mx-3">{t("faq")}</h3>
						</Link>
					</div>
				</Nav.Item>

				<Nav.Item as="li" className="active-li mt-3">
					<div className="d-flex justify-content-between align-items-between li-items">
						<Link to="/contact-us" className="d-flex" onClick={setShow}>
							<AiFillPhone size={15} className="mx-2 icon" />
							<h3 className="title mx-3">{t("contact-us")}</h3>
						</Link>
					</div>
				</Nav.Item>

				<Nav.Item as="li" className="active-li mt-3">
					<div className="d-flex justify-content-between align-items-between li-items">
						<Link to="/about-us" className="d-flex" onClick={setShow}>
							<BsInfoCircleFill size={15} className="mx-2 icon" />
							<h3 className="title mx-3">{t("about-us")}</h3>
						</Link>
					</div>
				</Nav.Item>

				<div className="mx-auto mt-4 sidebar-lang">
					<Languages />
				</div>
			</div>
		</Nav>
	)
}

SideBar.propTypes = {
	show: PropTypes.bool.isRequired,
}

export default SideBar
