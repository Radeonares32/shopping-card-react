import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar/Navbar";
import Topbar from "../../Home/Topbar/Topbar";
import { useAuth } from "../../../contexts/AuthContext";
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  let navigate = useNavigate()
  let {setUser,user} = useAuth()
  const emailHandler = (e) => {
    setEmail(e.target.value)
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const userT = await axios.get(`http://85.214.102.236:3000/user/getUserToken/${email}/${password}`)
      if(userT.data.message === 'Success Token'){
        localStorage.setItem('user',userT.data.data)
        setUser(true)
        setMessage("Success User Login")
        navigate('/') 
      }
    }
    catch(err) {
      if(err.message === "Request failed with status code 404"){
        setMessage("No User")
      } 
    }

  }
  return (
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
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={e=>onSubmitHandler(e)}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            onChange={e=>emailHandler(e)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            onChange={e=>passwordHandler(e)}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="Submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
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
  );
}
