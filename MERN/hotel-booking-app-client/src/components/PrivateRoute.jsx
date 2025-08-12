import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);

  return auth && auth.token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
