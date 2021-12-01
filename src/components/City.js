import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { stringifyUrl } from 'query-string';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import {getWeatherIcon} from '../utils.js';
import history from '../router/history.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function City() {

  let { lon, lat } = useParams();
  const [cityWeather, setCityWeather] = useState(false);
  const currentHour = moment(cityWeather?.current?.dt * 1000).utcOffset(cityWeather.timezone_offset / 3600).hour();
  const currentCity = useSelector(state => state.citiesData.city);
  let hoursLeft = [];

  for(let i = currentHour; i < 24; i++) {
    hoursLeft.push(i + ':00');
  }

  // API get lat and lon data and build more informations about weather in current city
  useEffect( async () => {

    const url = stringifyUrl({url: 'http://api.openweathermap.org/data/2.5/onecall', 

      query: {
      lat: lat,
      lon: lon,
      appid: '75b24c60110a0711f40d9bc303c5b00a',
      exclude: 'alerts',
      units: 'metric'
      }

    });

    const data = await (await fetch(url)).json();

    setCityWeather(data);

  }, []);

  let hourlyArray = cityWeather?.hourly || [];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: '#fff',
        },
        ticks: {
          color: '#fff',
          borderColor: '#fff'
        }
      },
      y: {
        grid: {
          display: false,
          borderColor: '#fff'
        },
        ticks: {
          color: '#fff',
          borderColor: '#fff'
        }
      }
    },
    plugins: {
      legend: false,
      title: {
        display: true,
        text: 'CITY WEATHER PER HOURS',
        color: '#fff'
      },
    },
  };

  if(hourlyArray) {
      var labels = hourlyArray.slice(0, 24 - currentHour);
  }

  const hourlyGraphData = {
      labels: hoursLeft,
      datasets: [
        {
          label: 'Temperature, ° ',
          data: labels.map((elem) => elem.temp),
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }
      ],
  };

  if(cityWeather) {
    return (
      <div className="city-block-page">
        <div className="city-bg-block">
          <button onClick={history.back}>Back</button>
          <h1 className="weather-city">{currentCity}</h1>
          <p className="weather-type">{cityWeather?.current?.weather[0].main}</p>
          <h1 className="weather-temp">{Math.round(cityWeather?.current?.temp)}<span>°C</span></h1>
          <p className="weather-day">
            <Moment tz={cityWeather?.timezone} format="dddd">{cityWeather?.current?.dt && new Date(cityWeather?.current?.dt * 1000).toISOString()}</Moment>
            <span>,&nbsp;
                <Moment tz={cityWeather?.timezone} format="HH:mm">{cityWeather?.current?.dt && new Date(cityWeather?.current?.dt * 1000).toISOString()}</Moment>
            </span>
          </p>
          <div className="weather-daily-temp">
            {cityWeather?.daily && cityWeather?.daily.map((elem, index) => {
              const weatherIcon = getWeatherIcon(elem?.weather[0]?.main);

              return (
                <div key={index}>
                  <p><Moment tz={elem?.timezone} format="ddd">{new Date(elem?.dt * 1000).toISOString()}</Moment></p>
                  <img src={weatherIcon.icon} />
                  <p>{Math.round(elem?.temp?.min)}<span>°</span> ~ {Math.round(elem?.temp?.max)}<span>°</span></p>
                </div>
              )

            })}    
          </div>
          <div className="weather-hourly-temp">
              <Line options={options} data={hourlyGraphData} />
          </div>
        </div>
      </div>
    )
  } else {
      return (
        <h1 className="loading">Loading...</h1>
      )
  }
}

export default City;
