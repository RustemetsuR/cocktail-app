import {
    COCKTAIL_TO_PUBLISHED_FAILURE,
    COCKTAIL_TO_PUBLISHED_SUCCESS,
    DELETE_COCKTAIL_FAILURE,
    DELETE_COCKTAIL_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS
} from "../actionTypes";

const initialState = {
    user: [],
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...state, user: action.value, error: null };
        case REGISTER_FAILURE:
            return { ...state, error: action.error };
        case LOGIN_SUCCESS:
            return { ...state, user: action.value, error: null };
        case LOGIN_FAILURE:
            return { ...state, error: action.error };
        case LOGOUT_USER:
            return { ...state, user: [] };
        case COCKTAIL_TO_PUBLISHED_SUCCESS:
            return { ...state, error: null };
        case COCKTAIL_TO_PUBLISHED_FAILURE:
            return { ...state, error: action.error };
        case DELETE_COCKTAIL_SUCCESS:
            return { ...state, error: null };
        case DELETE_COCKTAIL_FAILURE:
            return { ...state, error: action.error };
        default:
            return state;
    };
};


export default userReducer;