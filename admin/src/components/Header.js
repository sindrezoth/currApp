import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import Login from '../features/auth/Login.js';

const Header = () => {
  const { username, roles } = useAuth();
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

  return (
    <header>
      <Link to="/"><h1>Админка</h1></Link>
      {
        username ? 
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
            </ul>
          </nav>
        : null
      }
      {
         username ? accountPanel.isOpen ? 
          <>
            <button onClick={() => setAccountPanel(prev => ({...prev, isOpen: !prev.isOpen}))}>Закрыть</button>
            <button
              className="icon-button"
              title="Выйти"
              onClick={() => {
                sendLogout()
              }}
            >
              Выйти</button>
            
          </>
        : 
          <button onClick={() => setAccountPanel(prev => ({...prev, isOpen: !prev.isOpen}))}>
            <div>{username}</div>
          </button>
        : null
      }
    </header>
  );
}

export default Header;
