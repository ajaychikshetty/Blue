import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'firebase/compat/firestore';
import { GeoPoint } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import {useLocation} from "react-router-dom";
import {  useState } from "react";
import  {serverTimestamp,setDoc} from  "firebase/firestore";
import { auth,db} from "../../firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Recruiterpage= ({ inputs, title }) => {

    const [file, ] = useState("");
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
    

      const handleAdd= async (e)=>{
        e.preventDefault();
        try{
          const res = await createUserWithEmailAndPassword(auth,data.email,data.password);
          await setDoc(doc(db,"Hirers",res.user.uid),{
            ...data, 
            timeStamp: serverTimestamp(),
          });
          
        }catch(err){
          console.log(err);        }
      };
    
    //   const handleSubmit = async (e)=>{
    //     e.preventDefault();
    //     console.log("printig the ...data");
    //     console.log(dataa);
        
    //     try{
    //       await setDoc(doc(db,"Hirers",dataa.Role,dataa.Role,dataa.id),{
    //         ...dataa,
    //         location: new GeoPoint(19.22, 72.86994),
    //         timeStamp: serverTimestamp(),
    //       });
    //       await deleteDoc(doc(db, "Hirers", dataa.id));
    //       alert("approved ");
    //       navigate("/");
    //     }catch(err){
    //       console.log(err);
    //     }
    //   }
      


      const handleDecline = async (e)=>{
        e.preventDefault();
          try {
            await deleteDoc(doc(db, "Hirers", dataa.id));
            alert("Decilend");
          } catch (err) {
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


                <div className="formInput" key={"age"}>
                  <label>Age</label>
                  <input 
                  id = {"age"}
                  type={"text"} 
                  value={dataa.Age}
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

               

              <button type ="submit" onClick={handleDecline}>Decline</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruiterpage