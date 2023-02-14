import ProjectsView from "../components/ProjectsView";
import * as React from "react"
import "../custom.scss"
import "../style/index.scss"
import {useParams} from "react-router-dom";


const Projects = () => {

    let { userId } = useParams();

    return (
        <div>
            <div className="fade-background"/>
            <div className="splash-section d-flex justify-content-center mt-5 d-none d-sm-flex">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <p className="text-light mt-5 h1"><span className="bg-dark p-4 bg-dark rounded bg-opacity-75">My Projects</span></p>
                    </div>
                </div>
            </div>
            <ProjectsView/>
        </div>
    );
}



export default Projects