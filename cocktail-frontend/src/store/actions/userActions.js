import { push } from "connected-react-router";
import axiosApi from "../../axiosApi";
import { 
    LOGIN_FAILURE, 
    LOGIN_SUCCESS, 
    LOGOUT_USER, 
    REGISTER_FAILURE, 
    REGISTER_SUCCESS } from "../actionTypes"

const userRegisterSuccess = value => {
    return { type: REGISTER_SUCCESS, value };
};

const userRegisterFailure = error => {
    return { type: REGISTER_FAILURE, error };
};

const userLoginSuccess = value => {
    return { type: LOGIN_SUCCESS, value };
};

const userLoginFailure = error => {
    return { type: LOGIN_FAILURE, error };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().user.user.token;
        const headers = {
            'Authorization': token,
        };
        await axiosApi.delete("/users/sessions", { headers });
        dispatch({ type: LOGOUT_USER });
    }
};

export const facebookLogin = data => {
    return async dispatch => {
        try {
            const response = await axiosApi.post("/users/facebookLogin/login", data);
            dispatch(userLoginSuccess(response.data));
            dispatch(push("/home"));
        } catch (e) {
            dispatch(userLoginFailure(e.response.data.error));
        };
    };
};

export const facebookRegister = data => {
    return async dispatch => {
        try {
            const response = await axiosApi.post("/users/facebookLogin/register", data);
            dispatch(userRegisterSuccess(response.data));
            dispatch(push("/home"));
        } catch (e) {
            dispatch(userRegisterFailure(e.response.data.error));
        };
    };
};


