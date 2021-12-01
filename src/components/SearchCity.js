import React, { useState } from 'react';
import { stringifyUrl } from 'query-string';
import SearchInput from './SearchInput';
import WeatherGrid from './WeatherGrid';

function SearchCity() {

  let waitEntryCity = null;
  const [cities, setCities] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const getCity = (e) => {

    setSearchLoading(true);
    
    if(waitEntryCity) {
      clearTimeout(waitEntryCity);
    }

    // API to search city when we write data in input
    const url = stringifyUrl({url: 'http://api.openweathermap.org/data/2.5/find', 

      query: {
        q: e.target.value,
        appid: '75b24c60110a0711f40d9bc303c5b00a',
        units: 'metric'
      }

    });

    if(e.target.value === '') {
      setCities([]);
    }

    waitEntryCity = setTimeout(async () => {

      const data = await (await fetch(url)).json();

      setCities(data.list ?? []);
      setSearchLoading(false);

    }, 600);

  }


  return (
      <div className="search-city">
        <div className="filter-search">
          <SearchInput options={cities} searchLoading={searchLoading} onChange={getCity} />
          <WeatherGrid />
        </div>
      </div>    
  );
}

export default SearchCity;
