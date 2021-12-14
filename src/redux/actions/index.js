import * as types from "./actionTypes";

export const setUser = (user = {}) => {
    const type = types.SET_USER;
    return { type, payload: user };
};
