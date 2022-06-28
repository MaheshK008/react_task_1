import React,{useState,createContext} from "react";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/registration.component";
import Nav from "./components/nav.component";
import Dashboard from "./components/dashboard";

export const store = createContext();

const App = () => {
  const [token,setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token,setToken]}></store.Provider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/register" element = {<Register/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/dashboard" element = {<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
