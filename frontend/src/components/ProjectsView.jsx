import * as React from "react"

import {createProject, deleteProject, getProjects} from "../api/ApiClient";
import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


const ProjectsView = (props) => {

    const [name, setName] = React.useState("");
    const [projects, setProjects] = React.useState([]);
    const [uploading, setUploading] = React.useState(false);
    const [uploadSuccess, setUploadSuccess] = React.useState(false);

    const onProjectDelete = (id) => {
        deleteProject(id).then(() => {
            setProjects(projects.filter(p => p.id !== id));
        }).catch(err => {
            console.log(err);
        })
    }

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onNewProjectClicked = () => {
        setUploadSuccess(false);
        createProject(name).then((res) => {
            if (res.status === 200) {
                setName("");
                setUploadSuccess(true);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            onNewProjectClicked();
        }
    }

    useEffect(() => {
        getProjects().then((res) => {
            if (res.status === 200) {
                setProjects(res.data);
            } else {
                alert("Failed to getch your projects");
            }
        }).catch((err) => {
            alert("Failed to getch your projects");
        })
    }, [uploadSuccess])

    return (
        <div className="section bg-dark">
            <div className="d-grid mt-5 mb-5">
                <div className="row justify-content-around m-0">
                    <div className="card-group justify-content-center">
                        <div className="col-12 col-md-10 pop-above p-md-5">
                            <div className="card w-100">
                                <div className="card-body mx-auto text-center">
                                    <h3 className="card-title">My Projects</h3>
                                    <ul className="list-group mb-3">
                                        {projects.map((project) => {
                                            return (
                                                <li className="list-group-item d-flex justify-content-between">
                                                    <Link style={{textDecoration: "none"}} to={`/user/1/projects/${project.id}`}>
                                                        <span className="text-dark fw-bold">{project.name}</span>
                                                    </Link>
                                                    <span onClick={() => {
                                                        onProjectDelete(project.id)
                                                    }} className="ms-3 me-1">
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className="d-flex mb-5">
                                        <div className="col">
                                            <input onKeyDown={onKeyDown} onChange={onNameChange}
                                                   className="form-control form-control-lg" type="text"
                                                   placeholder="Project Name"></input>
                                        </div>
                                        <div className="col-auto ms-3">
                                            <div onClick={onNewProjectClicked} className="btn btn-outline-dark">Create
                                                Project
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

    export default ProjectsView