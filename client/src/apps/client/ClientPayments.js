import { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import usePersist from '../../hooks/usePersist.js';
import useAuth from '../../hooks/useAuth.js';

const ClientHome = () => {
  const navigate = useNavigate();
  const { email } = useAuth();
  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation();

  const [persist, setPersist] = usePersist();

  useEffect(() => {
    if (isSuccess) {
      console.log('sooo?');
      setPersist(false);

      //navigate('/')
    }
  }, [isSuccess, navigate]);

  return (
    <main>
      <h2>Оплата</h2>
    </main>
  );
}

export default ClientHome;

