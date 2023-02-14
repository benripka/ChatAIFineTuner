import * as React from "react"
import "../custom.scss"
import "../style/index.scss"

import { useState} from "react";
import {Link} from "react-router-dom";


const Home = () => {

    const [showModal, setShowModal] = useState(false);


    return (
        <div className="container mt-3 justify-content-center">
            <Link to="/user/1/projects" className="btn btn-outline-light">
                <span className="lead">My Projects</span>
            </Link>
        </div>
    );
}

export default Home