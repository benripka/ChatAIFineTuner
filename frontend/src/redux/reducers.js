import { combineReducers } from 'redux';
import {SET_FILES, SET_USER} from "./actionsTypes";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            console.log("Setting user");
            return {
                ...state,
                user: action.user
            };
        default:
            return {...state};
    }
}

const filesReducer = (state = [], action) => {
    switch (action.type) {
        case SET_FILES:
            console.log("Setting files");
            return [
                ...state,
                action.files
            ];
        default:
            return {...state};
    }
}

const rootReducer = combineReducers({
    files: filesReducer,
    users: userReducer
});

export default rootReducer;