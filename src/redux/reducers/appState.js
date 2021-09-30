import { SET_USER } from "../actions/actionTypes";

const intialState = {
    user: {
        loggedIn: false,
    },
};

export const appState = (state = intialState, action) => {
    switch (action.type) {
        // Carries user object from firebase
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};
