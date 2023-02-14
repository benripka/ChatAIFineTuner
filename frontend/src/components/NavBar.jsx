import * as React from "react"
import GoogleCalendarModal from "./GoogleCalendarModal";
import {useState} from "react";
import {Link} from "react-router-dom";

const NavBar = (props) => {

    const [atTop, setAtTop] = React.useState(true);
    const [navOpen, setNavOpen] = React.useState(false);
    const [showModal, setShowModal] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setAtTop(false);
            } else {
                setAtTop(true);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    }

    const dynamicStyles = {
        "navbar": atTop ? "bg-dark" : "bg-dark",
        "nav-menu": navOpen ? "show" : "hide"
    }

    const onBookingClicked = () => {
        setShowModal(true);
    }

    return (
        <div
            className={"navbar sticky-top d-flex justify-content-between text-white align-items-center pb-0 pt-1 ps-3 pe-3 " + dynamicStyles["navbar"]}>
            <GoogleCalendarModal show={showModal} onHide={() => setShowModal(false)}/>
            <div className="col-auto">
                <Link style={{textDecoration: "none"}} to="/" className="m-3 text-light">
                    <h1 className="fw-bold">Tunny 2.0</h1>
                </Link>
            </div>
            <div hidden={navOpen} className="col-auto d-flex justify-content-end d-none d-lg-flex d-sm-none d-md-none">
                <div className="col-auto ms-4">
                    <div onClick={onBookingClicked}
                         className="btn fw-bold rounded-pill btn-light lead ps-5 pe-5">
                        Help
                    </div>
                </div>
            </div>
            {/*<div onClick={() => setNavOpen(!navOpen)} className="col-auto d-lg-none btn">*/}
            {/*    <FontAwesomeIcon icon={faBars} className="text-primary" onClick={toggleNav}/>*/}
            {/*</div>*/}
            <div className="col-auto ms-4 d-lg-none">
                <div onClick={onBookingClicked}
                     className="btn rounded-pill btn-primary lead text-white">
                    Contact
                </div>
            </div>
        </div>
    );
}

export default NavBar;