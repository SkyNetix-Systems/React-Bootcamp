import React from 'react'
import { Route,redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute({...rest}) {
    const {auth} = useSelector((state) => ({...state}));
    
  return (
    <div>
      
    </div>
  )
}

export default PrivateRoute
