import * as types from "./actionTypes";

export const setUser = (user = {}) => {
    const type = types.SET_USER;
    return { type, payload: user };
};

export const setLoginModalOpen = (loginModalOpen) => {
    const type = types.SET_LOGIN_MODAL_OPEN;
    const payload = {
        loginModalOpen,
    };
    return { type, payload };
};
export const setLoadingModalOpen = (loadingModalOpen) => {
    const type = types.SET_LOADING_MODAL_OPEN;
    const payload = {
        loadingModalOpen,
    };
    return { type, payload };
};
