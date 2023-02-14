import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCaretLeft,
    faCaretRight,
    faCheck,
    faCheckCircle,
    faEdit, faPen,
    faPencil,
    faTimes
} from "@fortawesome/free-solid-svg-icons";


export const PromptEvaluator = ({prompts, onDeletePrompt}) => {

    const [prompt, setPrompt] = React.useState(null);
    const [editing, setEditing] = React.useState(false);

    useEffect(() => {
        if (prompts.length > 0) {
            setPrompt(prompts[0]);
        }
    })

    const onNextClicked = () => {
        const index = prompts.indexOf(prompt) + 1;
        if (index < prompts.length - 1) {
            setPrompt(prompts[index])
        }
    }

    const onLastClicked = () => {
        const index = prompts.indexOf(prompt) - 1;
        if (index > 0) {
            setPrompt(prompts[index])
        }
    }

    const onEditClicked = () => {
        setEditing(!editing);
    }

    return (
        <div className="d-flex">
            <div className="col">
                <div className="row justify-content-center m-1 ms-3 me-3 p-2 rounded-top bg-success bg-opacity-50">
                    { prompt && editing && <input type="text" className="form-control" value={prompt.prompt} />}
                    {! editing && prompt && prompt.prompt}
                </div>
                <div className="row justify-content-center m-1 ms-3 me-3 p-2 rounded-bottom bg-danger bg-opacity-50">
                    { prompt && editing && <input type="text" className="form-control" value={prompt?.response} />}
                    {! editing && prompt && prompt.response}
                </div>
            </div>
            <div className="col-auto align-self-center rounded me-3">
                <div onClick={onEditClicked} className="row mb-2"><FontAwesomeIcon icon={faPen} size="lg"/></div>
                <div className="row mb-2"><FontAwesomeIcon icon={faCheck} size="lg"/></div>
                <div className="row"><FontAwesomeIcon icon={faTimes} size="lg"/></div>
            </div>
        </div>
    );
}

export default PromptEvaluator