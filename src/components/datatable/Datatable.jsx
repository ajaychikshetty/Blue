// import './datatable.scss'
// import { DataGrid } from '@mui/x-data-grid';
// import { userColumns } from '../../datatablesource';
// import {Link} from "react-router-dom";
// //import { params } from 'use-query-params';
// import {useEffect, useState} from "react";
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   getDoc,
//   doc,
// } from "firebase/firestore";
// import {db} from "../../firebase";
// import 'firebase/firestore';
// //mport {firebase} from "../../firebase"


// const Datatable = () => {
//   const [data,setData]= useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       let list = [];
//       try {
//         const querySnapshot = await getDocs(collection(db, "PendingWorkers"));
//         querySnapshot.forEach((doc) => {
//           list.push({id:doc.id, ...doc.data()});
//         });
//         setData(list);
//         console.log(list);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();

//   }, []);

//   console.log(data);

//   const handleDelete = async (id) => {
//       //await deleteDoc(doc(db, "PendingWorkers", id));
    
//       var ref = doc(db, "PendingWorkers", id.value);
//       const docSnap = await getDoc(ref);

//       if(!docSnap.exists()){
//          alert("doc doesnt exist");
//          return; 
//       }
//       await deleteDoc(ref)
//       .then(()=>{
//           alert("doc deleted");
//       })
//       .catch((error)=>{
//           alert("error"+error);
//       })
    
//    console.log("jobDelete")
//       //setData(data.filter((item) => item.id !== id));
//   };

//   // const handleViewData = async () => {
//   //   await getDocs(doc(db, "PendingWorkers"));
//   //   var user = firebase.auth().currentUser;
//   //   db.collection("PendingWorkers").where("id", "==", user.uid).get()
//   //   const dataRef = await db.collection('PendingWorkers').get();
//   //   setData(dataRef.docs.map((doc) => doc.data()));
//   // };

//   const actionColumn = [
//     {field: "action", headerName: 'Action', width: 200, renderCell: ()=>{
//       return(
//         <div className="cellAction">
//           <Link to= '/users/test' style={{textDecoration: "none"}}>
//           <div className="viewButton" >View</div>
//           </Link>
    
//           <Link to= '/' style={{textDecoration: "none"}}>
//           <div className="deleteButton" onClick={() => handleDelete()}>
//           Delete
//           </div>
          
//           </Link>
//         </div>
//       )
//     }},
//   ];
  
//   return (
//     <div className='datatable'>
//       <div className="datatableTitle">
//         Add New User
//         <Link to= '/users/new' style={{textDecoration: "none"}} className='link'>
//           Add New
//         </Link>
//       </div>
//          <DataGrid
//         rows={data}
//         columns={userColumns.concat(actionColumn)}
//         pageSize={9}
//         rowsPerPageOptions={[9]}
//         checkboxSelection
//       />datatable
//     </div>
//   )
// }

// export default Datatable

import './datatable.scss'

import { userColumns } from '../../datatablesource';
import {Link, useNavigate} from "react-router-dom";
//import { params } from 'use-query-params';
import {useEffect, useState} from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {db} from "../../firebase";
import 'firebase/firestore';


const Datatable = () => {
  const [data,setData]= useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "PendingWorkers"));
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
      await deleteDoc(doc(db, "PendingWorkers", id));
    } catch (err) {
      console.log(err);
    }
  }


  const actionColumn = [
    {field: "action", headerName: 'Action', width: 200, renderCell: ()=>{
      return(
        <div className="cellAction">
          {/* <Link to= '/users/test' style={{textDecoration: "none"}}>
          <div className="viewButton">View</div>
          </Link> */}
    
          {/* <Link to= '/' style={{textDecoration: "none"}}> */}
          {/* <div className="deleteButton" onClick={handleDelete}>
          Delete
          </div> */}
          
          {/* </Link> */}
        </div>
      )
    }},
  ];

  const [id, setId]= useState("")
  
  return (
    <div className='datatable'>
      <div className="datatableTitle">
        Add New User
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
                {/* <Link  */}
                {/* to= {{
                  pathname: '/users/view',

                 }} state={{'data':element}}
                style={{textDecoration: "none"}}> */}
                  <div 
                  className="viewButton" onClick={
          function(){
                      navigate('/users/view',{state:{element}})}}>View</div>

                {/* </Link> */}
                </td>
                {/* <td><button onClick={()=>updatedata(i)}>View</button></td> */}
            </tr>
          )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Datatable