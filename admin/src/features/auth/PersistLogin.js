import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";
import PulseLoader from 'react-spinners/PulseLoader';

const PersistLogin = () => {
  const [persist, setPersist] = usePersist();

  const effectRan = useRef(false);
  const navigate = useNavigate();

  const token = useSelector(selectCurrentToken);

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

  let content = <Outlet />;

  if(!persist) {
  } else if (isUninitialized) { 
  } else if (isLoading) { 
    content = <div className="text-dark">Инициализация запроса на авторизацию...</div>
    console.log('loading');
    content = <div className="text-dark">Авторизация...</div>
  } else if (isError) { 
    console.log('error')
    content = <Outlet /> //<div className="text-light bg-danger">Ошибка авторизации.</div>
  } else if (isSuccess && trueSuccess) { 
    console.log('success');
    content = <Outlet />
  } else if (token && isUninitialized) { 
    console.log('token and uninit');
    content = <Outlet />
  }

  return content;
}

export default PersistLogin;
