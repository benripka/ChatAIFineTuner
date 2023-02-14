import * as React from "react"
import "../custom.scss"
import "../style/index.scss"

import { useState} from "react";
import {Provider} from "react-redux";
import store from "../redux/store";
import App from "../App";


const IndexPage = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default IndexPage

export const Head = () => <title>NORICOR</title>
