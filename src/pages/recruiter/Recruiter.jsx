import React from "react";
import {Link, useNavigate} from "react-router-dom";
//import { params } from 'use-query-params';
import {useEffect, useState} from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {db} from "../../firebase";
import 'firebase/firestore';
import "./recruiter.scss"


const Recruiter= () => {
  const [data,setData]= useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "Hirers"));
        querySnapshot.forEach((doc) => {
          list.push({id:doc.id, ...doc.data()});
        });
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

  }, []);

  const handleDelete = async() => {
    try {
      await deleteDoc(doc(db, "Hirers", id));
    } catch (err) {
      console.log(err);
    }
  }


  const actionColumn = [
    {field: "action", headerName: 'Action', width: 200, renderCell: ()=>{
      return(
        <div className="cellAction">
        
        </div>
      )
    }},
  ];

  const [id, setId]= useState("")
  
  return (
    <div className='datatable'>
      <div className="datatableTitle">
        Verify Hirers
        <Link to= '/users/new' style={{textDecoration: "none"}} className='link'>
          Add New
        </Link>
      
      </div>
      <button className="deleteButton" onClick={handleDelete}>
          Delete
      </button>

      <table className='datatablemain'>
      <th align='left'>Action</th>
      <th align='left'>ID</th>
      <th align='left'>Aadhar Number</th>
      <th align='left'>Username</th>
      <th align='left'>View</th>
        <tbody className='tablebody' border={1}>
        {data.map((element) => {
          return(
            <tr>
              <td><input type="checkbox" id="studentId" value={element.id} onClick={(e)=>{
                if(e.target.checked){
                  setId(element.id)
                  console.log(element);
                }}}/>
                </td>
              <td>{element.id}</td>
              <td>{element.Aadhar_Number}</td>
              <td>{element.Name}</td>
              <td>
               <div className="viewButton" onClick={
               function(){
                      navigate('/recruiter/view',{state:{element}})}}>View</div>
              </td>
            </tr>
          )
          })}
        </tbody>
      </table>
    </div>
  )
}
 export default Recruiter