import React from 'react'
import { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({children}) => {
    const {token}=useSelector((state)=>state.auth)
    if(token!=null){
        return children 
    }else{
        return <Navigate to="/login" />
    }
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute