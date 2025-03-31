import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import { selectClient } from '../../features/clients/clientSlice.js';

import logoImg from '../../images/logo.png';
import profileImg from '../../images/profile/2.png';

const HeaderMenu = () => {
  const { email, firstname, lastname } = useSelector(selectClient);
  const [theme, setTheme] = useState('dark-theme');

  const navigate = useNavigate();

  const [accountPanel, setAccountPanel] = useState({
    isOpen: false,
  });
  
  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log('sooo?');
      setPersist(false);

      //navigate('/')
    }
  }, [isSuccess, navigate]);
  useEffect(() => {
  }, []);

  return (
    <div className="header-right">
      <div className="profile_log dropdown">
        <div className="user dropdown-toggle" data-bs-toggle="dropdown" id="ropdownMenuButtonDark" data-bs-auto-close="outside" aria-expanded="false">
          <span className="thumb"><img src={profileImg} alt="User avatar" /></span>
          <span className="arrow"><i className="icofont-angle-down"></i></span>
        </div>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="ropdownMenuButtonDark">
          <div className="user-email">
            <div className="user">
              <span className="thumb"><img src={profileImg} alt="" /></span>
              <div className="user-info">
                {firstname || lastname ?
                  <>
                    <h5>{firstname || ''} {lastname || ''}</h5>
                    <span>{email}</span>
                  </> 
                  : <h5>{email}</h5> }
              </div>
            </div>
          </div>
          
          {/*<div className="user-balance">
            <div className="available">
              <p>Доступно</p>
              <span>0.00 BTC</span>
            </div>
            <div className="total">
              <p>Всего</p>
              <span>0.00 USD</span>
            </div>
          </div>*/}
          <Link to="/profile" className="dropdown-item">
            <i className="icofont-ui-user"></i>Профиль
          </Link>
          {/*
          <Link href="accounts.html" className="dropdown-item">
            <i className="icofont-wallet"></i>Кошелёк
          </Link>
          <a href="settings-profile.html" className="dropdown-item">
            <i className="icofont-ui-settings"></i>Настройки
          </a>
          <a href="settings-activity.html" className="dropdown-item">
            <i className="icofont-history"></i>Активность
          </a>
          <a href="lock.html" className="dropdown-item">
            <i className="icofont-lock"></i>Заблокировать
          </a>*/}
          <button onClick={e=>sendLogout()} className="dropdown-item logout">
            <i className="icofont-logout"></i> Выйти
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeaderMenu;
