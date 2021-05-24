import './App.css';
import BankTable from './BankTable';
import DropDown from './DropDown';
import axios from "axios";
import React, { useEffect } from 'react';

const limit = 50;


function App() {
  const [rows, setRows] = React.useState([]);  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [city, setCity] = React.useState("Bangalore");
  const [search, setSearch] = React.useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const createData = (results) => {
      const banks = results.data;
      //setRows([]);
      setRows(banks);
  }
  const getBanks = () => {
      const url = `/api/branches?q=${city}&limit=${rowsPerPage}&offset=${page}`;
      axios.get(url)
      .then(results => createData(results))
      .catch(err => {
        console.log("error" + err);
      });
  }
  useEffect(() => {
    //  let timer = null;
    if(search.length == 0)  
      getBanks();
    else
      handleSearch();
     // return () => clearTimeout(timer);  
  }, [city, page, rowsPerPage]);

  const handleSearch = () => {
      const url = `/api/branches/autocomplete?q=${search}&limit=${rowsPerPage}&offset=${page}`;
      axios.get(url)
      .then(results => { 
        createData(results);
      })
      .catch(err => {
        console.log("error" + err);
      });
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Branches</h1>
          <DropDown search={search} setPage={setPage} setCity={setCity} setSearch={setSearch} 
          handleSearch={handleSearch}/>
        </div>
        <BankTable handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} 
        rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} setPage={setPage} rows={rows} page={page} 
         />
      </div>
    </>
  );
}

export default App;
