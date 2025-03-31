import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";
import PulseLoader from 'react-spinners/PulseLoader';

const PersistLogin = () => {
  const [persist, setPersist] = usePersist();

  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const navigate = useNavigate();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
      const verifyRefreshToken = async () => {
        console.log('verifying refresh token');
        try {
          await refresh();
          setTrueSuccess(true);
          console.log('success');
        }
        catch (err) {
          console.error(err);
        }
     }

      if (!token) verifyRefreshToken();
    }

    return () => effectRan.current = true;

    // eslint-disable-next-line
  }, []);

//  if(!persist) {
//  } else if (isUninitialized) { 
//    console.log('uninitialized');
//  } else if (isLoading) { 
//    console.log('loading');
//  } else if (isError) { 
//    console.log('error')
//  } else if (isSuccess && trueSuccess) { 
//    console.log('success');
//  } else if (token && isUninitialized) { 
//    console.log('token and uninit');
//  }

  return isLoading ? <p>Запрос на авторизацию...</p> : <Outlet /> ;
}

export default PersistLogin;
