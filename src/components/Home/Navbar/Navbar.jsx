import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from '../../../contexts/AuthContext'
export default function Navbar(){
    const {user} = useAuth()
        const [userEmail,setEmailUser] = useState()
        useEffect(()=>{
            if(user) {
                axios.get('http://85.214.102.236:3000/user/getTokenUser',{
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('user'),
        
                    }    
                }).then(user=>{
                    setEmailUser(user.data.data[0].email)
                })
            }
            
            
        },[])
    
    
    return(
<div className="container-fluid">
        <div className="row border-top px-xl-5">
            <div className="col-lg-1 d-none d-lg-block">
               
            </div>
            <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                    <Link to='/' className="text-decoration-none d-block d-lg-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </Link>
                  
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                       
                        <div className="navbar-nav ml-auto py-0">
                        {user ?
                        <>
                         <Link to='/profile'  className="nav-item nav-link" >{userEmail}</Link>           
                         <Link to='/orders'  className="nav-item nav-link" >Orders</Link>           
                         <a href='/logout'  className="nav-item nav-link" >Logout</a>           
                         </>
                         :
                         <>
                             <Link to='/register'  className="nav-item nav-link" >Register</Link>
                         <Link to='/login'  className="nav-item nav-link" >Login</Link>
                         </> 
                        }
                           
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    )
}