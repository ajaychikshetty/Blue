import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import View from "./pages/view/View";
import Recruiter from "./pages/recruiter/Recruiter";
import Requested from "./pages/requested/Requested";
import RecruiterPage from "./pages/recruiter/RecruiterPage";
//import Components from "../../pages/view/Components";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
 
function App() {
  const {currentUser} = useContext(AuthContext)
 

  const RequireAuth = ({children})=>{
    return currentUser ? (children): <Navigate to="/login"/>;
  };

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path = "login" element = {<Login/>} />
          <Route index element = {<RequireAuth> <Home/> </RequireAuth>} />
          
          
          <Route path="users">
            <Route index element = {<List/>}/>
            <Route path=":userID" index element = {<Single/>} />
            <Route path="view" index element = {<View inputs = {userInputs} title={'Add new user'}/>} />
            <Route path="new" index element = {<New inputs = {userInputs} title={'Add new user'}/>} />
          </Route>

          <Route path="recruiter">
            <Route index element = {<List/>}/>
            <Route path=":userID" index element = {<Single/>} />
            <Route path="view" index element = {<RecruiterPage inputs = {userInputs} title={'Add new user'}/>} />
            <Route path="new" index element = {<New inputs = {userInputs} title={'Add new user'}/>} />
          </Route>

          <Route index element = {<Recruiter/>} path="recruiters"/>
          <Route index element = {<Requested/>} path="requested"/>

          {/* <Route path="products">
            <Route index element = {<List/>}/>
            <Route path=":productID" index element = {<Single/>} />
            <Route path="new" index element = {<New inputs = {productInputs} title={'Add new products'}/>} />
          </Route> */}

        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
