import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faTimes} from "@fortawesome/free-solid-svg-icons";
import React from "react";


export const FileList = ({files, onDeleteFile}) => {

    const renderFileItems = () => {
        return Object.entries(files).map(([i, file]) => (
            <li className="list-group-item" key={i}>
                <div className="d-flex justify-content-between">
                    <div className="col-auto"><FontAwesomeIcon size="xl" icon={faFile}/></div>
                    <div className="col text-">
                        <span>{file.name}</span>
                    </div>
                    <div onClick={() => onDeleteFile(file.id)} className="col-auto">
                        <span><FontAwesomeIcon icon={faTimes}/></span>
                    </div>
                </div>
            </li>
        ))
    }

    return (
        <ul className="list-group">
            {renderFileItems()}
        </ul>
    );
}

export default FileList