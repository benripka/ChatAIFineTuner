import * as React from "react"
import "../custom.scss"
import "../style/index.scss"
import {useParams} from "react-router-dom";
import ProjectView from "../components/ProjectView";


const Project = () => {

    let { userId, projectId } = useParams();

    return (
        <div>
            <div className="fade-background"/>
            <div className="splash-section d-flex justify-content-center mt-5 d-none d-sm-flex">
                <div className="container">
                    <div className="row justify-content-center text-center">
                    </div>
                </div>
            </div>
            <ProjectView userId={userId} projectId={projectId} />
        </div>
    );
}



export default Project