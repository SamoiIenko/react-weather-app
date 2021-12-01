import { combineReducers } from "redux";
import { citiesReducer } from "./citiesReducer";

export function themeReducer(state, aciton) {
    return state;
}

export const rootReducer = combineReducers({
    citiesData: citiesReducer
});