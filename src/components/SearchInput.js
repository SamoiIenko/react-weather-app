import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { addCity } from '../redux/actions';
import { addCityToStorage } from '../utils';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchInput(props) {

  const [open, setOpen] = useState(false);
  const [clear, setClear] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const cities = useSelector((state) => state.citiesData.cities);
  const dispatch = useDispatch();

  useEffect(() => {

    if(Array.isArray(props.options)) {
      setOptions(props.options);
    }

  }, [props.options]);

  useEffect(() => {

    setLoading(props.searchLoading);

  }, [props.searchLoading]);

  const addCityToStore = (city) => {

    if(!city) return;
  
    const isExist = cities.find((cityElem) => city.id == cityElem.id);

    if(isExist) {
      toast.error(`Warning! ${city.name} is already exist`);
      return;
    }

    setClear(!clear);
    dispatch(addCity(city));
    addCityToStorage(city.id);
  }

  return (
    <React.Fragment>
      <Autocomplete
        onChange={(e, option) => addCityToStore(option)}
        freeSolo={true}
        id="asynchronous-demo"
        sx={{ width: '100%', margin: '0 auto' }}
        open={open}
        key={clear}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
          setOptions([]);
        }}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => 
          <Box component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props} key={option.id}>
              <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.sys.country.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.sys.country.toLowerCase()}.png 2x`}
                  alt=""
              />
              <p>{option.name}, {option.sys.country} {option.weather.main} {option.main.temp} </p>
          </Box>

        }
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField sx={{backgroundColor: '#fff'}}
            onChange={props.onChange}
            {...params}
            label="Search city"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <ToastContainer />
    </React.Fragment>
  );
}

export default SearchInput;
