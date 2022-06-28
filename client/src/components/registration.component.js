import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    employeeId: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPwd: "",
  });
  const changeHandler = e=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const submitHandler = e=>{
    e.preventDefault();
    console.log(data.password , data.confirmPwd)
    if(data.password!==data.confirmPwd) alert("Passwords are not matching...");
    else{
      let {name,employeeId,email,mobileNo,password}=data; 
      axios.post('http://localhost:5000/signUp',{name,employeeId,email,mobileNo,password}).then(res=>{
         console.log(res.data.msg);
          if(res.data) {
          <Navigate replace to='/register'/>
        }
      }).catch(err=>alert("Error",err.response.data.msg));
    }
  }

  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <h3>Register</h3>
          <input type='text' onChange={changeHandler} name="name" placeholder="Enter Name"/><br/>
          <input type='text' onChange={changeHandler} name="employeeId" placeholder="Enter Employee ID"/><br/>
          <input type='email' onChange={changeHandler} name="email" placeholder="Enter Email"/><br/>
          <input type='mobile' onChange={changeHandler} name="mobileNo" placeholder="Enter mobile number"/><br/>
          <input type='password' onChange={changeHandler} name="password" placeholder="Enter Password"/><br/>
          <input type='password' onChange={changeHandler} name="confirmPwd" placeholder="Enter Confirm Password"/><br/>
          <input type='submit' value="Register"/>
        </form>
      </center>
    </div>
  );
};

export default Register;
