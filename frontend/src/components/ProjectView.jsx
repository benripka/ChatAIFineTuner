import * as React from "react"
import {MyFileDrop} from "./FileDrop";
import FileList from "./FileList";
import {useEffect} from "react";
import {
    deleteProjectFile,
    deleteTrainingData,
    getProjectFiles,
    getTrainingData,
    startPreprocessing
} from "../api/ApiClient";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faGears} from "@fortawesome/free-solid-svg-icons";
import PromptResponseList from "./PromptResponseList";
import PromptEvaluator from "./PromptEvaluator";


const ProjectView = ({userId, projectId}) => {

    const [files, setFiles] = React.useState({});
    const [prompts, setPrompts] = React.useState([]);
    const [preprocessing, setPreprocessing] = React.useState(false);

    useEffect(() => {
        getProjectFiles(userId, projectId).then((res) => {
            if (res.status === 200) {
                setFiles(res.data);
            }
            else {
                alert("Failed to fetch your files");
            }
        }).catch((err) => {
            alert("Failed to fetch your files");
        })
        getTrainingData(userId, projectId).then((res) => {
            if (res.status === 200) {
                setPrompts(res.data);
            }
            else {
                alert("Failed to fetch your prompts");
            }
        }).catch((err) => {
            alert("Failed to fetch your prompts");
        })
    }, [])


    const onFileDelete = (id) => {
        deleteProjectFile(userId, projectId, id).then(() => {
            setFiles(files.filter(p => p.id !== id));
        }).catch(err => {
            console.log(err);
        })
    }

    const onPromptDelete = (id) => {
        deleteTrainingData(userId, projectId, id).then(() => {
            setPrompts(prompts.filter(p => p.id !== id));
        }).catch(err => {
            console.log(err);
        })
    }

    const onFineTuneClicked = () => {
        setPreprocessing(true)
        startPreprocessing(userId, projectId).then((res) => {
            if (res.status === 200) {
            }
            else {
                alert("Failed to start preprocessing");
            }
        }).catch((err) => {
            alert("Failed to start preprocessing");
        })
    }

    return (
        <div className="section bg-dark">
            <div className="d-grid mt-5 mb-5">
                <div className="row justify-content-around m-0">
                    <div className="card-group justify-content-center">
                        <div className="col-12 col-md-5 pop-above p-md-5">
                            <div className="card w-100">
                                <div className="card-body mx-auto text-center">
                                    <h3 className="card-title mb-3">Project Files</h3>
                                    <FileList files={files} onDeleteFile={onFileDelete}/>
                                    <br/>
                                    <MyFileDrop userId={userId} projectId={projectId} />
                                    <div className="d-flex justify-content-end">
                                        <div className="col-auto">
                                            {
                                                preprocessing ? (
                                                    <div className={`btn btn-outline-dark fw-bold mt-2 ${preprocessing && "disabled"}`}>
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        <span className="ms-4">Preprocessing ...</span>
                                                    </div>
                                                ) : (
                                                    <div onClick={onFineTuneClicked} className={`btn btn-outline-dark fw-bold mt-2 ${preprocessing && "disabled"}`}>
                                                        <FontAwesomeIcon className="me-3"  icon={faGears} size="lg"/>
                                                        Pre Process Training Data
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="col-auto ms-2">
                                            <div onClick={onFineTuneClicked} className={`btn btn-outline-dark fw-bold mt-2 ${preprocessing && "disabled"}`}>
                                                <FontAwesomeIcon className="me-3"  icon={faCheckCircle} size="lg"/>
                                                Build Fine Tuned AI
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                prompts.length > 0 &&
                                <div className="card w-100 mt-3">
                                    <div className="card-body mx-auto text-center">
                                        <h3 className="card-title mb-3">Prompt Evaluator</h3>
                                        <PromptEvaluator prompts={prompts} />
                                    </div>
                                </div>
                            }
                        </div>
                        {
                            prompts.length > 0 &&
                            <div className="col-12 col-md-7 pop-above p-md-5 d-flex">
                                <div className="card w-100">
                                    <div className="card-body text-center">
                                        <h3 className="card-title mb-3">Training Prompts</h3>
                                        <PromptResponseList prompts={prompts} onDeletePrompt={onPromptDelete} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectView