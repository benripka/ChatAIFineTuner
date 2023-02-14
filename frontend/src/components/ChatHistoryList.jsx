import * as React from "react"
import ChatBotButton from "./ChatBotButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleRight, faTimes} from "@fortawesome/free-solid-svg-icons";


const ConversationWindow = ({responseLoading, messages}) => {

    messages.sort((a, b) => {
        return new Date(a.date_created) - new Date(b.date_created);
    });

    return (
        <div className="">
            {messages.map((message) => {
                let date_created = new Date(message.date_created);
                return (
                    <div className={`d-flex mb-1 ${message.bot ? "justify-content-start" : "justify-content-end"}`}>
                        <div className="col-auto p-2">

                        </div>
                        <div style={{maxWidth: "75%"}} className={`col-auto ms-3 text-light p-2 rounded rounded-3 ${message.bot ? "bg-primary" : "bg-secondary"}`}>
                            {message.text}
                        </div>
                        <div className="col-auto p-2 align-self-center text-secondary small">
                            {date_created.getHours()}:{date_created.getMinutes()}:{date_created.getSeconds()}
                        </div>
                    </div>
                )
            })}
            {responseLoading && (
                <div className={`d-flex m-5 justify-content-center`}>
                    <div className="dot-revolution"></div>
                </div>
            )
            }
        </div>

    )
}

export default ConversationWindow