import * as React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import chat from "../images/chat.png";


const ChatBotButton = ({onClick}) => {

    return (
        <div className="position-fixed bottom-0 end-0 m-3">
            <div className="bg-light p-3 rounded">
                <img onClick={onClick} style={{width: "100px"}} src={chat} alt="Talk to an Expert"/>
            </div>
        </div>
    )
}

export default ChatBotButton