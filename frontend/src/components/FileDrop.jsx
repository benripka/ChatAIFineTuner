import React, {useEffect, useState} from 'react';
import {FileDrop} from 'react-file-drop';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCancel, faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {getProjectFiles, uploadProjectFiles} from "../api/ApiClient";
import FileList from "./FileList";

export const MyFileDrop = ({userId, projectId}) => {
    const styles = {border: '1px solid black', width: 600, color: 'black', padding: 20};

    const [files, setFiles] = useState({});
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const onUploadCancel = () => {
        setFiles({});
    }

    const onDrop = (files, event) => {
        console.log(files)
        setFiles(files);
        uploadProjectFiles(userId, projectId, files).then((res) => {
            if (res.status === 200) {
                setUploadSuccess(true);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <div style={styles}>
                <FileList files={files}/>
                {Object.keys(files).length === 0 &&
                    <FileDrop onDrop={onDrop}>
                        <FontAwesomeIcon className="mb-3" size="2xl" icon={faFileUpload}/>
                        Drop Files Here
                    </FileDrop>
                }
                {
                    files.length > 0 && <div className="d-flex justify-content-end">
                        <div onClick={onUploadCancel} className="col-auto mt-3 btn btn-outline-dark">
                            Cancel
                            <FontAwesomeIcon className="ms-3" icon={faCancel}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default MyFileDrop