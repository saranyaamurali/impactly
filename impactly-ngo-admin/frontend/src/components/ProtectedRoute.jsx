import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ 
  children, 
  isLoggedIn, 
  userRole, 
  requiredRole 
}) => {
  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/ngo/login" replace />;
  }

  // If role is required, check if user has correct role
  if (requiredRole) {
    // Handle single role
    if (typeof requiredRole === 'string') {
      if (userRole !== requiredRole) {
        return <Navigate to="/" replace />;
      }
    }
    // Handle multiple roles
    else if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(userRole)) {
        return <Navigate to="/" replace />;
      }
    }
  }

  // User is authenticated and has correct role
  return children;
};

export default ProtectedRoute;
