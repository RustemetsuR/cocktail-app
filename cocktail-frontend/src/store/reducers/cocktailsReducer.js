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
    GET_USERS_OWN_COCKTAILS_SUCCESS
} from "../actionTypes";

const initialState = {
    cocktails: [],
    singleCocktailInfo: [],
    usersCocktails: null,
    successModal: false,
    error: null,
};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COCKTAILS_SUCCESS:
            return { ...state, cocktails: action.value, error: null };
        case GET_COCKTAILS_FAILURE:
            return { ...state, error: action.error };
        case GET_SINGLE_COCKTAIL_SUCCESS:
            return { ...state, singleCocktailInfo: action.value, error: null };
        case GET_SINGLE_COCKTAIL_FAILURE:
            return { ...state, error: action.error };
        case ADD_COCKTAIL_SUCCESS:
            return { ...state, error: null , successModal: true};
        case ADD_COCKTAIL_FAILURE:
            return { ...state, error: action.error , successModal: false};
        case GET_USERS_OWN_COCKTAILS_SUCCESS:
            return { ...state, usersCocktails: action.value, error: null };
        case GET_USERS_OWN_COCKTAILS_FAILURE:
            return { ...state, error: action.error }; 
        case DELETE_COCKTAIL_SUCCESS:
            return {...state, error: null};
        case DELETE_COCKTAIL_FAILURE:
            return {...state, error: action.error};
        case CLOSE_MODAL: 
            return {...state, successModal: false};
        default:
            return state;
    };
};


export default cocktailsReducer;