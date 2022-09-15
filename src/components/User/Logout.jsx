import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'
export default function Logout(){
  let  {setUser} = useAuth()
  useEffect(()=>{
    localStorage.removeItem('user') 
    setUser(false) 
  })
 
    return <Navigate to='/' ></Navigate>
}