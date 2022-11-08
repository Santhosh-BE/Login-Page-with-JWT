import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
function PrivateRoute({ authLoading }) {
  
  return authLoading ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute;