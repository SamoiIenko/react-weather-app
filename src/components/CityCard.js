import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import {getWeatherIcon, removeCityFromStorage} from '../utils.js';
import { useDispatch } from 'react-redux';
import { removeCity, setCurrentCity, updateWeather } from '../redux/actions.js';
import { stringifyUrl } from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Link
} from "react-router-dom";

function CityCard(props) {

  const weatherIcon = getWeatherIcon(props.cityData.weather[0].main);
  const dispatch = useDispatch();

  const addCityNameToStore = () => {
    dispatch(setCurrentCity(props.cityData.name));
  }

  const removeCityFromStore = () => {
    dispatch(removeCity(props.cityData));
    removeCityFromStorage(props.cityData.id);
  }

  const updateCityWeather = async () => {

    const url = stringifyUrl({url: 'http://api.openweathermap.org/data/2.5/weather', 

      query: {
        id: props.cityData.id,
        appid: '75b24c60110a0711f40d9bc303c5b00a',
        units: 'metric'
      }

    });
    
    const data = await (await fetch(url)).json();

    dispatch(updateWeather(
      {
        ...props.cityData,
        weather: data.weather,
        main: data.main
      }
    ));

    toast(`Update weather in ${props.cityData.name} is successfully!`);

  }

  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 475, backgroundImage: `url(${weatherIcon.bg})`}} className="card">
        <div className="overlay">
          <CardContent >
              <h1>Weather in {props.cityData.name}, {props.cityData.sys.country}</h1>
              <p>{Math.round(props.cityData.main.temp)}°C</p>
              <p className="weather-paragraph">
                <img src={weatherIcon.icon}/>
                {props.cityData.weather[0].main}
              </p>
              <p className="humidity">Humidity:  {props.cityData.main.humidity}%</p>
              <p className="wind-speed">Wind speed: {props.cityData.wind.speed} meters/sec</p>
          </CardContent>

          <CardActions disableSpacing >
              <ButtonGroup sx={{marginLeft: 'auto'}} variant="contained" aria-label="outlined primary button group">
                <Link to={`/weather/${props.cityData.coord.lon}/${props.cityData.coord.lat}`}><Button><AutoGraphIcon onClick={() => addCityNameToStore()}></AutoGraphIcon></Button></Link>
                <Button><CachedIcon onClick={() => updateCityWeather()} /></Button>
                <Button><DeleteIcon onClick={() => removeCityFromStore()} /></Button>
              </ButtonGroup>
          </CardActions>
        </div>
      </Card>

      <ToastContainer />
    </React.Fragment>
  );
}

export default CityCard;