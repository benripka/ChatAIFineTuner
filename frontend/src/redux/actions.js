// actions.js
import {SET_FILES, SET_USER} from "./actionsTypes";

export const setFiles = (files) => {
    return { type: SET_FILES, files: files };
}

export const setUser = (user) => {
    return { type: SET_USER, user: user };
}