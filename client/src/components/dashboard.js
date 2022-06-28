import axios from 'axios';
import React,{useContext,useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import { store } from '../App'

const Dashboard = () => {
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard',{
            headers:{
                'x-token':token
            }
        }).then(res=>setData(res.data)).catch(err=>console.log(err));
    },[])
    if(!token){
        return <Navigate replace to ='/login'/>
    }
  return (
    <div>
        {data}
      Welcome to dashboard!!
    </div>
  )
}

export default Dashboard
