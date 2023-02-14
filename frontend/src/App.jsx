import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import ChatBot from "./components/ChatBot";

const App = () => {

    return (
        <Router>
            <div>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/user/:userId/projects" element={<Projects/>}/>
                    <Route path="/user/:userId/projects/:projectId" element={<Project/>}/>
                </Routes>
                <ChatBot />
            </div>
        </Router>
    );
}

export default App
