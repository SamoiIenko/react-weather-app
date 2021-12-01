import clearWeather from './img/clear-weather.jpg';
import cloudWeather from './img/cloud-weather.jpg';
import rainWeather from './img/rain-weather.jpg';
import snowyWeather from './img/snowy-weather.jpg';
import thunderWeather from './img/thunder-weather.jpg';
import cloud from './img/cloud.svg';
import clear from './img/clear.svg';
import snowy from './img/snowy.svg';
import rain from './img/rain.svg';
import thunder from './img/thunder.svg';
import { stringifyUrl } from 'query-string';

export function getWeatherIcon(type) {
    switch(type) {
        case 'Clouds': 
        return {
            bg: cloudWeather,
            icon: cloud           
        };
        case 'Rain':
        return {
            bg: rainWeather,
            icon: rain
        };
        case 'Snow':
        return {
            bg: snowyWeather,
            icon: snowy
        };
        case 'Thunder':
        return {
            bg: thunderWeather,
            icon: thunder
        };
        default: 
        return {
            bg: clearWeather,
            icon: clear
        };
    }
}

// Function adds the city id to the storage
export function addCityToStorage(cityId) {
    let itemStorage = localStorage.getItem('cities');

    if(!itemStorage) {
        itemStorage = [];
    } else {
        itemStorage = JSON.parse(itemStorage);
    }

    itemStorage.push(cityId);

    localStorage.setItem('cities', JSON.stringify(itemStorage));

}

// Function removes the city id from storage
export function removeCityFromStorage(cityId) {
    let itemStorage = localStorage.getItem('cities');

    if(!itemStorage) {
        itemStorage = [];
    } else {
        itemStorage = JSON.parse(itemStorage);
    }


    itemStorage = itemStorage.filter((elem) => elem !== cityId);

    localStorage.setItem('cities', JSON.stringify(itemStorage));   
}

// Function get API data and use local IDs to build weather data
export async function parseCitiesFromLocalStorage() {

    let itemStorage = localStorage.getItem('cities');

    if(!itemStorage) {
        return [];
    }

    itemStorage = JSON.parse(itemStorage);

    let cityArray = [];

    for(let elem of itemStorage) {

        const url = stringifyUrl({url: 'http://api.openweathermap.org/data/2.5/weather', 
            query: {
                id: elem,
                appid: '75b24c60110a0711f40d9bc303c5b00a',
                units: 'metric'
            }
        });

        const data = await (await fetch(url)).json();

        cityArray.push(data);
    }

    return cityArray;
}