import { ADD_CITY, SET_CURRENT_CITY, INIT, REMOVE_CITY, UPDATE_WEATHER } from "./types";


export function addCity(city) {
    return {
        type: ADD_CITY,
        payload: city
    }
}

export function removeCity(city) {
    return {
        type: REMOVE_CITY,
        payload: city
    }
}

export function updateWeather(city) {
    return {
        type: UPDATE_WEATHER,
        payload: city
    }
}

export function init(cities) {
    return {
        type: INIT,
        payload: cities
    }
}

export function setCurrentCity(city) {
    return {
        type: SET_CURRENT_CITY,
        payload: city
    }
}