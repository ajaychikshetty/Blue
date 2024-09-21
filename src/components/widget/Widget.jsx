import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import React, {useEffect, useState} from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import {db} from "../../firebase";
import 'firebase/firestore';

const Widget = ({type}) => {

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);


  let data; //variable to call objects for widgets
  const diff = 20; //giving percentage for increase in users count
  switch(type){
    case 'user':
      data = {
        title: "WAITING LIST",
        Usercount: data2.length,
        link: "See all Users",
        icon: (<PersonOutlineIcon className="icon" style={{
          color: 'crimson',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
        }}
        />
        ),
      };
      break;
      case 'activeuser':
      data = {
        title: "TOTAL WORKERS",
        Usercount: data1.length,
        link: "See all Users",
        icon: (<GroupIcon className="icon" style={{
          color: 'goldenrod',
          backgroundColor: 'rgba(218, 165, 32, 0.2)',
        }}/>),
      };
      break;
      case 'requesteduser':
      data = {
        title: "APPROVED HIRERS",
        Usercount: 0,
        link: "See all Users",
        icon: (<PeopleOutlineIcon className="icon" style={{
          color: 'green',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
        }}/>),
      };
      break;
      default:
        break;
  }

  useEffect(() => {
    (async() => {
      let list = []
      const querySnapshot1 = await getDocs(collection(db, "ApprovedWorkers","CarDriver","CarDriver"));
      const querySnapshot3 = await getDocs(collection(db, "ApprovedWorkers","Watchmen","Watchmen"));


      // console.log(querySnapshot2.data());
      // console.log(querySnapshot);
      querySnapshot1.forEach((doc) => {
        list.push({...doc.data()});
        
      });
      querySnapshot3.forEach((doc) => {
        list.push({...doc.data()});
        
      });
      
      setData1(list);
      let list1 = []
      const querySnapshot2 = await getDocs(collection(db, "PendingWorkers"));

      // console.log(querySnapshot2.data());
      // console.log(querySnapshot);
      querySnapshot2.forEach((doc) => {
        list1.push({...doc.data()});
        
      });
      
      setData2(list1);
    })()
  },[])
  
  return (
    <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">{data.Usercount}</span>
          <span className="link">{data.link}</span>
        </div>
        <div className="right">
          <div className="percentage positive">
          <KeyboardArrowUpIcon/>
          {diff}%
          </div>
          {data.icon}
        </div>
    </div>
  )
}

export default Widget