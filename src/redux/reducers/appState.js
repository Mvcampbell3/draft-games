import { SET_USER, SET_LOGIN_MODAL_OPEN } from "../actions/actionTypes";

const intialState = {
    user: {
        loggedIn: false,
    },
    loginModalOpen: false,
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

        default:
            return state;
    }
};
