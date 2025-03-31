import { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
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
import ClientPayments from './ClientPayments.js';

const ClientHome = () => {
  const navigate = useNavigate();
  const { email } = useAuth();

  const [persist, setPersist] = usePersist();


  return (
    <main>
      <h2>Личный кабинет</h2>
      <Link to='/payments'>Пополнить счёт</Link>
    </main>
  );
}

export default ClientHome;

