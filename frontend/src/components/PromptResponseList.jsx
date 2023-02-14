import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faTimes} from "@fortawesome/free-solid-svg-icons";
import React from "react";


export const PromptResponseList = ({prompts, onDeletePrompt}) => {

    const renderFileItems = () => {
        return Object.entries(prompts).map(([i, prompt]) => (
            <li className="list-group-item" key={i}>
                <div className="d-flex justify-content-between">
                    <div className="col">
                        <div className="row justify-content-center m-1 ms-3 me-3 p-2 rounded-top bg-success bg-opacity-50">
                            {prompt.prompt}
                        </div>
                        <div className="row justify-content-center m-1 ms-3 me-3 p-2 rounded-bottom bg-danger bg-opacity-50">
                            {prompt.response}
                        </div>
                    </div>
                    <div onClick={() => onDeletePrompt(prompt.id)} className="col-auto align-self-center">
                        <span><FontAwesomeIcon icon={faTimes}/></span>
                    </div>
                </div>
            </li>
        ))
    }

    return (
        <ul style={{height: "500px", overflow: "scroll"}} className="list-group">
            {renderFileItems()}
        </ul>
    );
}

export default PromptResponseList