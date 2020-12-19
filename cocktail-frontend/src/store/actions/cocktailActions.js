import { push } from "connected-react-router";
import axiosApi from "../../axiosApi";
import {
    ADD_COCKTAIL_FAILURE,
    ADD_COCKTAIL_SUCCESS,
    CLOSE_MODAL,
    DELETE_COCKTAIL_FAILURE,
    DELETE_COCKTAIL_SUCCESS,
    GET_COCKTAILS_FAILURE,
    GET_COCKTAILS_SUCCESS,
    GET_SINGLE_COCKTAIL_FAILURE,
    GET_SINGLE_COCKTAIL_SUCCESS,
    GET_USERS_OWN_COCKTAILS_FAILURE,
    GET_USERS_OWN_COCKTAILS_SUCCESS,
} from "../actionTypes"

const getCocktailsSuccess = value => {
    return { type: GET_COCKTAILS_SUCCESS, value };
};

const getCocktailsFailure = error => {
    return { type: GET_COCKTAILS_FAILURE, error };
};

const getSingleCocktailSuccess = value => {
    return { type: GET_SINGLE_COCKTAIL_SUCCESS, value };
};

const getSingleCocktailFailure = error => {
    return { type: GET_SINGLE_COCKTAIL_FAILURE, error };
};

const deleteCocktailSuccess = () => {
    return { type: DELETE_COCKTAIL_SUCCESS };
};

const deleteCocktailFailure = error => {
    return { type: DELETE_COCKTAIL_FAILURE, error };
};

const addCocktailSuccess = () => {
    return { type: ADD_COCKTAIL_SUCCESS };
};

const addCocktailFailure = error => {
    return { type: ADD_COCKTAIL_FAILURE, error };
};

const getUsersCocktailsSuccess = value => {
    return {type: GET_USERS_OWN_COCKTAILS_SUCCESS, value};
};

const getUsersCocktailsFailure = error =>{
    return {type: GET_USERS_OWN_COCKTAILS_FAILURE, error};
};

export const closeModalAction = () =>{
    return {type: CLOSE_MODAL};
};

export const fetchGetCocktails = () => {
    return async (dispatch, getState) => {
        if (getState().user.user.role === "admin") {
            const headers = {
                'Authorization': getState().user.user && getState().user.user.token
            };
            try {
                const response = await axiosApi.get("/cocktails/unpublished", { headers });
                dispatch(getCocktailsSuccess(response.data));
            } catch (e) {
                dispatch(getCocktailsFailure(e.response.data));
            }
        } else {
            try {
                const response = await axiosApi.get("/cocktails/published");
                dispatch(getCocktailsSuccess(response.data));
            } catch (e) {
                dispatch(getCocktailsFailure(e.response.data));
            }
        }
    }
}


export const fetchGetSingleCocktail = id => {
    return async (dispatch, getState) => {
        if (getState().user.user.role === "admin") {
            const headers = {
                'Authorization': getState().user.user && getState().user.user.token
            };
            try {
                const response = await axiosApi.get("/cocktails/unpublished/" + id, { headers });
                dispatch(getSingleCocktailSuccess(response.data));
                dispatch(push("/home/" + id));
            } catch (e) {
                dispatch(getSingleCocktailFailure(e));
            }
        } else {
            try {
                const response = await axiosApi.get("/cocktails/published/" + id);
                dispatch(getSingleCocktailSuccess(response.data));
                dispatch(push("/home/" + id));
            } catch (e) {
                dispatch(getSingleCocktailFailure(e));
            }
        }
    }
}

export const fetchDeleteCocktail = id => {
    return async (dispatch, getState) => {
        if (getState().user.user.role === "admin") {
            const headers = {
                'Authorization': getState().user.user && getState().user.user.token
            };
            try {
                await axiosApi.delete("/cocktails/" + id, { headers });
                dispatch(deleteCocktailSuccess());
                dispatch(push("/home/"));
            } catch (e) {
                dispatch(deleteCocktailFailure(e));
            }
        }
    }
}

export const fetchPublishCocktail = id => {
    return async (dispatch, getState) => {
        if (getState().user.user.role === "admin") {
            const headers = {
                'Authorization': getState().user.user && getState().user.user.token
            };
            let data;
            try {
                await axiosApi.put("/cocktails/" + id,data, { headers });
                dispatch(addCocktailSuccess());
                dispatch(push("/home/"));
            } catch (e) {
                dispatch(addCocktailFailure(e));
            }
        }
    }
}

export const fetchAddCocktail = data => {
    return async (dispatch, getState) => {
        if (getState().user.user !== []) {
            const token = getState().user.user.token;
            const headers = {
                'Authorization': token,
            };
            try {
                await axiosApi.post("/cocktails", data, { headers });
                dispatch(addCocktailSuccess());
            } catch (e) {
                dispatch(addCocktailFailure(e));
            };
        };
    };
};

export const fetchGetUsersCocktails = () =>{
    return async (dispatch, getState) => {
        if (getState().user.user !== []) {
            const token = getState().user.user.token;
            const headers = {
                'Authorization': token,
            };
            try {
                const response = await axiosApi.get("/cocktails/users-own-cocktails", { headers });
                dispatch(getUsersCocktailsSuccess(response.data));
            } catch (e) {
                dispatch(getUsersCocktailsFailure(e));
            };
        };
    };
}

