import Navbar from "../../Home/Navbar/Navbar";
import Topbar from "../../Home/Topbar/Topbar";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(){
  let navigate = useNavigate()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [passwordRepeat,setPasswordRepeat] = useState()
  const [firstName,setFirstName] = useState()
  const [lastName,setLastName] = useState()
  const [message,setMessage] = useState()
  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e)=> {
    setPassword(e.target.value)
  }
  const passwordRepeatHandler = (e) => {
    setPasswordRepeat(e.target.value)
  }
  const firstNameHandler = (e) => {
      setFirstName(e.target.value)
  }
  const lastNameHandler = (e) => {
    setLastName(e.target.value)
  }
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
  const user =  await axios.post("http://85.214.102.236:3000/user/postUser",{
    firstName,
    lastName,
    email,
    password,
    passwordRepeat
  })
    if(user.data.message === "User created") {
      setMessage(user.data.message)
      
        navigate("../login",{replace:true})
      
    }
    
  }

    return(
       <>
       <Topbar></Topbar>
       <Navbar></Navbar>
        <div className="container h-100 my-5">
          {message &&
          <div className="alert alert-info text-center">
            {message}
          </div>
          }
          
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius:"25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

                <form className="mx-1 mx-md-4"  onSubmit={e=>onSubmitHandler(e)}>
                <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" onChange={e=>firstNameHandler(e)} placeholder="First Name" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" onChange={e=>lastNameHandler(e)} placeholder="Last Name" className="form-control" />
                    </div>
                  </div>  
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" onChange={e=>emailHandler(e)} placeholder="Email" className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" onChange={e=>passwordHandler(e)} placeholder="Password"  className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" onChange={e=>passwordRepeatHandler(e)} placeholder="Password Repeat" className="form-control" />
                    </div>
                  </div>


                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
       </>
    )
}