import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="top">
        <Link to= '/' style={{textDecoration: "none"}}>
        <span className="logo"><img src="C:\Users\Vidhi\OneDrive\Desktop\adminpanel\src\components\sidebar\logo.jpeg" alt=""/>BlueCollar</span>
        </Link>
      </div>
      <hr></hr>
      <div className="center">
        <ul>
        <p className="title">MAIN</p>
         <Link to = '/' style={{textDecoration: "none"}}>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
            {/* Approved workers */}
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to= '/users' style={{textDecoration: "none"}}>
          <li>
            <GroupIcon className="icon"/>
            <span>Workers</span> 
            {/* pending workers */}
          </li>
          </Link>
          <Link to= '/recruiters' style={{textDecoration: "none"}}>
          <li>
            <PeopleOutlineIcon className="icon"/>
            <span>Recruiters</span>
            {/* recruiters data */}
          </li>
          </Link>

          <Link to= '/requested' style={{textDecoration: "none"}}>
          <li>
            <PeopleOutlineIcon className="icon"/>
            <span>Requested Data</span>
            {/* requested  */}
          </li>
          </Link>

          {/* <p className="title">USEFUL</p>
          <li>
            <QueryStatsIcon className="icon"/>
            <span>Stats</span>
          </li>
          <li>
            <NotificationsActiveIcon className="icon"/>
            <span>Notification</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamIcon className="icon"/>
            <span>System Health</span>
          </li>
          <li>
            <PsychologyIcon className="icon"/>
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className="icon"/>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountBoxIcon className="icon"/>
            <span>Profile</span>
          </li> */}
          <p className="title">USER</p>
          <Link to= '/login' style={{textDecoration: "none"}}>
          <li>
            <ExitToAppIcon className="icon"/>
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      {/* <div className="bottom">
        <div className="colorOptions"></div>
        <div className="colorOptions"></div>
      </div> */}
    </div>
  )
}

export default Sidebar