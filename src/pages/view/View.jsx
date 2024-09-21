import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { GeoPoint } from "firebase/firestore";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
  } from "firebase/firestore";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import Components from "../../pages/view/Components";
import {useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import  {serverTimestamp,setDoc} from  "firebase/firestore";
import { auth,db,storage} from "../../firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const View = ({ inputs, title }) => {

    const [file, setFile] = useState("");
    const [data,setData] = useState({});

    const locationn = useLocation();

    const navigate = useNavigate()
    
    var dataa=locationn.state['element'];
    console.log(dataa.id);

    const handleInput = (e) =>{
        const id = e.target.id;
        const value = e.target.value;
        console.log("printing ...data");
        console.log(...data);
        setData({...data, [id]:value});
      };
    console.log(locationn.state);      
    // console.log(locationn.state['element']);      

      const handleAdd= async (e)=>{
        e.preventDefault();
        try{
          const res = await createUserWithEmailAndPassword(auth,data.email,data.password);
          await setDoc(doc(db,"PendingWorkers",res.user.uid),{
            ...data, 
            timeStamp: serverTimestamp(),
          });
          //navigate(-1)
        }catch(err){
          console.log(err);        }
      };
    
      const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("printig the ...data");
        console.log(dataa);
        
        try{
          await setDoc(doc(db,"ApprovedWorkers",dataa.Role,dataa.Role,dataa.id),{
            // locationnn:new firebase.firestore.GeoPoint(dataa.location.latitude, dataa.location.longitude),
            ...dataa,
            location: new GeoPoint(19.22, 72.86994),
            // Name:,
            timeStamp: serverTimestamp(),
          });
          //navigate(-1)
        }catch(err){
          console.log(err);
        }
      }


      const handleDecline = async (e)=>{
        e.preventDefault();
        console.log("printig the ...data");
        console.log(dataa);
        
        try{
          await setDoc(doc(db,"Declined",dataa.id),{
            // locationnn:new firebase.firestore.GeoPoint(dataa.location.latitude, dataa.location.longitude),
            ...dataa,
            location: new GeoPoint(19.22, 72.86994),
            // Name:,
            timeStamp: serverTimestamp(),
          });
          try {
            await deleteDoc(doc(db, "PendingWorkers", dataa.id));
          } catch (err) {
            console.log(err);
          }
          //navigate(-1)
        }catch(err){
          console.log(err);
        }
      }


  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
      <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src= {
                file
                  ? URL.createObjectURL(file)
                  : dataa.img
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              {/* <div className="formInput">
                {/* <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> */}
                {/* <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />  */}
              {/* </div>  */}

              {/* {inputs.map((input) => (
                console.log(input),
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                  id = {input.id}
                  type={input.type} 
                //   value={}
                  onChange={handleInput}/>
                </div>
              ))} */}


                

               <div className="formInput" key={"username"}>
                  <label>ID</label>
                  <input 
                  id = {"username"}
                  type={"text"} 
                  value={dataa.id}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"displayName"}>
                  <label>Display Name</label>
                  <input 
                  id = {"displayName"}
                  type={"text"} 
                  value={dataa.Name}
                  onChange={handleInput}/>
                </div>


                <div className="formInput" key={"phone"}>
                  <label>Phone</label>
                  <input 
                  id = {"phone"}
                  type={"text"} 
                  value={dataa.Phone}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"address"}>
                  <label>Address</label>
                  <input 
                  id = {"address"}
                  type={"text"} 
                  value={dataa.Address}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"aadhar_number"}>
                  <label>Adhaar Number</label>
                  <input 
                  id = {"aadhar_number"}
                  type={"text"} 
                  value={dataa.Aadhar_Number}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"salary"}>
                  <label>Expected Salary</label>
                  <input 
                  id = {"salary"}
                  type={"text"} 
                  value={dataa.Expected_Salary}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"role"}>
                  <label>Role</label>
                  <input 
                  id = {"role"}
                  type={"text"} 
                  value={dataa.Role}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"age"}>
                  <label>Age</label>
                  <input 
                  id = {"age"}
                  type={"text"} 
                  value={dataa.Age}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"bio"}>
                  <label>Bio</label>
                  <input 
                  id = {"bio"}
                  type={"text"} 
                  value={dataa.Bio}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"gender"}>
                  <label>Gender</label>
                  <input 
                  id = {"gender"}
                  type={"text"} 
                  value={dataa.Gender}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"experience"}>
                  <label>Experience</label>
                  <input 
                  id = {"experience"}
                  type={"text"} 
                  value={dataa.Experience}
                  onChange={handleInput}/>
                </div>

                <div className="formInput" key={"availablity"}>
                  <label>Availablity</label>
                  <input 
                  id = {"availablity"}
                  type={"text"} 
                  value={dataa.availability}
                  onChange={handleInput}/>
                </div>


              <button type ="submit" onClick={handleSubmit}>Approve</button>

              <button type ="submit" onClick={handleDecline}>Decline</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View