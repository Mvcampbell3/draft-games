import {
    SET_USER,
    SET_LOGIN_MODAL_OPEN,
    SET_LOADING_MODAL_OPEN,
} from "../actions/actionTypes";

const intialState = {
    user: {
        loggedIn: false,
    },
    loginModalOpen: false,
    loadingModalOpen: true,
};

export const appState = (state = intialState, action) => {
    switch (action.type) {
        // Carries user object from firebase
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        // Flag for displaying Login Modal
        case SET_LOGIN_MODAL_OPEN: {
            const { loginModalOpen } = action.payload;
            return {
                ...state,
                loginModalOpen,
            };
        }

        case SET_LOADING_MODAL_OPEN: {
            const { loadingModalOpen } = action.payload;
            return {
                ...state,
                loadingModalOpen,
            };
        }

        default:
            return state;
    }
};
