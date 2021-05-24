import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, FormControl, InputBase, MenuItem, Select, withStyles } from '@material-ui/core';
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
const columns = [
  { id: 'bank_name', label: 'Bank', minWidth: 120 },
  { id: 'bank_id', label: 'BankID', minWidth: 60 },
  { id: 'ifsc', label: 'IFSC\u00a0Code', minWidth: 100 },
  { id: 'branch', label: 'Branch', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'district', label: 'District', minWidth: 140 },
  { id: 'state', label: 'State', minWidth: 100 },
  
  {
    id: 'address',
    label: 'Address',
    minWidth: 140,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },

];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function BankTable(props) {
  const classes = useStyles();
  const { rows, page, setPage, rowsPerPage, setRowsPerPage, handleChangeRowsPerPage, handleChangePage } = props;
  const [val, setVal] = useState(5);
  const [pageNo, setPageNo] = useState(0);
  const handleChangeRows = (event) => {
      setVal(event.target.value);
      handleChangeRowsPerPage(event);
  }
  const getPrevPage = (event) => {
    const p = page - 1 < 0 ? 0 : page - 1;
    handleChangePage(event, p);
  }
  const getNextPage = (event) => {
    handleChangePage(event, page + 1);
  }
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="footer">
        <FormControl className={classes.margin}>
        
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={val}
          onChange={handleChangeRows}
          input={<BootstrapInput />}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>

        </Select>
      </FormControl>
            <Button variant="contained" color="secondary" onClick={getPrevPage}>
              Prev
            </Button>
            <Button variant="contained" color="secondary" onClick={getNextPage}>
              Next
            </Button>
        </div>
      </TableContainer>
      
    </Paper>
  );
}
