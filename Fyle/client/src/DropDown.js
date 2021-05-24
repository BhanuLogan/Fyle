import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import "./App.css";
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function DropDown(props) {
  const classes = useStyles();
  const [val, setVal] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState("");
  const cities = {
    10 : "Bangalore",
    20 : "Mumbai",
    30 : "Thane",
    40 : "Raigad",
    50 : "Pune"
  }
  const { search, setCity, setSearch, handleSearch, setPage } = props;
  const handleChange = (event) => {
    setVal(event.target.value);
    setSearch("");
    setPage(0);
    setCity(cities[event.target.value]);
  };
  const handleSeachChange = (event) => {
     setSearch(event.target.value);
     setSearchInput(event.target.value);      
  }
  useEffect(() => {
    let timer = null;
    setPage(0);
    timer = setTimeout(() => {
        if(search.length != 0)
          handleSearch();
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);
  return (
    <div>
      
      <FormControl className={classes.margin}>
        
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={val}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={10} name="Bangalore">Bangalore</MenuItem>
          <MenuItem value={20} name="Mumbai">Mumbai</MenuItem>
          <MenuItem value={30} name="Thane">Thane</MenuItem>
          <MenuItem value={40} name="Raigad">Raigad</MenuItem>
          <MenuItem value={50} name="Pune">Pune</MenuItem>

        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        
        <BootstrapInput id="demo-customized-textbox" placeholder="Search" 
        onKeyUp={handleSeachChange} />
      </FormControl>
      
    </div>
  );
}
