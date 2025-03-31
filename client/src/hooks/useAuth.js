import {useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  console.log(token);

  if (token) {
    const decoded = jwtDecode(token);
    const { email, roles, username } = decoded.UserInfo;
    //console.log(decoded.UserInfo);
    //console.log(roles)
    
      console.log(email)
    if( email ) {
      return { email };
    }
    if( username ) {
      return {roles, username};
    }

  }

  return { username: '', roles: [] };
}

export default useAuth;
