import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"

import useAuth from '../../hooks/useAuth.js';
import ClientPayments from './ClientPayments.js';
import { useGetClientAccountDetailsMutation } from '../../features/clients/clientApiSlice.js';
import { selectClient } from '../../features/clients/clientSlice.js'

import AccountEdit from './AccountEdit.js';

const ClientAccount = () => {
  const navigate = useNavigate();
  const { email } = useAuth();
  const [getClientAccountDetalis, states] = useGetClientAccountDetailsMutation();

  const client = useSelector(selectClient);

  useEffect(() => {
    getClientAccountDetalis();
  }, []);

  return (
    <div>
      <h2>Аккаунт</h2>
      <Link to='/home'>Личный кабинет</Link>

      <AccountEdit client={client}/>
    </div>
  );
}

export default ClientAccount;

