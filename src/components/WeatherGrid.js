import React, { useEffect } from 'react';
import CityCard from './CityCard';
import { useDispatch, useSelector } from 'react-redux';
import { init } from '../redux/actions.js';
import { parseCitiesFromLocalStorage } from '../utils';

function WeatherGrid() {

  const dispatch = useDispatch();
  const citiesStore = useSelector(state => state.citiesData.cities);

  useEffect(async() => {

    const cityList = await parseCitiesFromLocalStorage();
    
    dispatch(init(cityList));

  }, []);

  return (
    <div className="weather-grid">
      {citiesStore.map((elem, index) => 
        <CityCard cityData={elem} key={index}/>
      )}
    </div>
  )
}

export default WeatherGrid;
