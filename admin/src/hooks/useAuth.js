import {useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;
    
    if( username ) {
      return {roles, username};
    }

  }

  return { username: '', roles: [] };
}

export default useAuth;
