import './table.scss'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import {db} from "../../firebase";
import 'firebase/firestore';
import { computeHeadingLevel } from '@testing-library/react';

const TableUI = () => {
  const [data,setData]= useState([]);
  const [select,setselect]= useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try{
        const querySnapshot = await getDocs(collection(db, "ApprovedWorkers","Watchmen","Watchmen"));
        const querySnapshot2 = await getDocs(collection(db, "ApprovedWorkers","CarDriver","CarDriver"));
        const querySnapshot3 = await getDocs(collection(db, "ApprovedWorkers","BusDriver","BusDriver"));
        const querySnapshot4 = await getDocs(collection(db, "ApprovedWorkers","Cook","Cook"));
        const querySnapshot5 = await getDocs(collection(db, "ApprovedWorkers","HouseHelp","HouseHelp"));
        const querySnapshot6 = await getDocs(collection(db, "ApprovedWorkers","Babysitter","Babysitter"));
        // console.log(querySnapshot2.data());
        // console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          list.push({id:doc.id, ...doc.data()});
        });

        querySnapshot2.forEach((doc) => {
          list.push({id:doc.id, ...doc.data()});
        });

        // querySnapshot3.forEach((doc) => {
        //   list.push({id:doc.id, ...doc.data()});
        // });
        setData(list);
        // console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

  }, []);
  
  function _filterSelect(row) {
   console.log("calling filter select");
    var text_select = row, val_select = select;
    var temp= text_select.indexOf(val_select) === -1 ? 'none' : '';
    return temp;
  }
  function setselectt(){
    console.log(document.getElementById('filter').value);
  setselect(document.getElementById('filter').value);
}

// const setselectt(event) =>{
//   setselect
// }

  return (
    <TableContainer component={Paper} className = 'table'>
      <div className='tableheading'>
      APPROVED WORKERS DATA <br></br>
            <select  class="select-table-filter" data-table="order-table" onChange={setselectt} id="filter" value={select}>
              <option value="">All</option> 
              <option value="Watchmen">Watchmen</option>  
              <option value="CarDriver">CarDriver</option>  
              <option value="BusDriver">BusDriver</option>
              <option value="Cook">Cook</option>  
              <option value="HouseHelp">HouseHelp</option>  
              <option value="Babysitter">Babysitter</option>   
            </select> 
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableID'>ID</TableCell>
            <TableCell className='tableAadhar'>AADHAR</TableCell>
            <TableCell className='tableWorkerName'>WORKER</TableCell>
            <TableCell className='tc'>ROLE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} style={{display: _filterSelect(row.Role)}}> 
            {/* id is the unique key of table */}
              <TableCell className='tableCell'>{row.id}</TableCell>
              <TableCell className='tableCell'>{row.Aadhar_Number}</TableCell>
              <TableCell className='tableCell'>{row.Name}</TableCell>
              <TableCell className='tableCell'>
                <span className='tableCell' >{row.Role}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
  );
}

export default TableUI