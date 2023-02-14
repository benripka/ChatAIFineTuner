import axios from 'axios';

const BASE_URL = "http://localhost:5000"


export const getProjects = () => {
    return axios.get(`${BASE_URL}/users/${"1"}/projects`)
}

export const createProject = async (name) => {
    let body = {
        name: name
    }
    return axios.post(`${BASE_URL}/users/${"1"}/projects`, body)
}

export const deleteProject = async (id) => {
    return axios.delete(`${BASE_URL}/users/${"1"}/projects/${id}`)
}

export const uploadProjectFiles = async (userId, projectId, files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    return axios.post(`${BASE_URL}/users/${userId}/projects/${projectId}/files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getProjectFiles = async (userId, projectId) => {
    return axios.get(`${BASE_URL}/users/${userId}/projects/${projectId}/files`)
}

export const deleteProjectFile = async (userId, projectId, fileId) => {
    return axios.delete(`${BASE_URL}/users/${userId}/projects/${projectId}/files/${fileId}`)
}

export const startPreprocessing = async (userId, projectId) => {
    return axios.post(`${BASE_URL}/users/${userId}/projects/${projectId}/preprocessing_jobs`)
}

export const getTrainingData = async (userId, projectId) => {
    return axios.get(`${BASE_URL}/users/${userId}/projects/${projectId}/training_data`)
}

export const deleteTrainingData = async (userId, projectId, trainingDataId) => {
    return axios.delete(`${BASE_URL}/users/${userId}/projects/${projectId}/training_data/${trainingDataId}`)
}

export const createConversations = async (userId) => {
    return axios.post(`${BASE_URL}/users/${userId}/conversations`)
}

export const getConversation = async (userId, conversationId="") => {
    return axios.get(`${BASE_URL}/users/${userId}/conversations`)
}

export const createConversationMessage = async (userId, conversationId, message) => {
    let body = {
        message: message
    }
    return axios.post(`${BASE_URL}/users/${userId}/conversations/${conversationId}/messages`, body)
}

export const startResponseJob = async (userId, conversationId, message) => {
    let body = {
        message: message
    }
    return axios.post(`${BASE_URL}/users/${userId}/conversations/${conversationId}/chat_response_jobs`, body)
}

export const getResponseJob = async (userId, conversationId) => {
    return axios.get(`${BASE_URL}/users/${userId}/conversations/${conversationId}/chat_response_jobs`)
}