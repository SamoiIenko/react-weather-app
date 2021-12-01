import { ADD_CITY, REMOVE_CITY, UPDATE_WEATHER, INIT, SET_CURRENT_CITY } from "./types";

const initialState = {
    cities: [],
    city: ''
};

export function citiesReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_CITY:
            return {
                ...state,  
                cities: [...state.cities, action.payload]
            }
        case REMOVE_CITY: 
            return {
                ...state,
                cities: state.cities.filter((elem) => elem.id !== action.payload.id)
            }
        case UPDATE_WEATHER:
            return {
                ...state,
                cities: state.cities.map((elem) => elem.id === action.payload.id ? action.payload : elem)
            }
        case INIT:
            return {
                ...state,
                cities: action.payload
            }
        case SET_CURRENT_CITY: 
            return {
                ...state,
                city: action.payload
            }
        default:
            return state;
        
    }
}