import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import Login from '../features/auth/Login.js';
import HeaderMenu from '../apps/client/HeaderMenu';
import logoImg from '../images/logo.png';
import profileImg from '../images/profile/2.png';

const Header = ({children}) => {
  const { email } = useAuth();

  return (
    <>
    <header className="">
        {/*<nav className="navbar navbar-expand-md" role="navigation">
          <div className="container d-flex flex-nowrap">
            <div className="d-flex flex-wrap m-2">
              <Link className="navbar-brand" to="/"><img src={logoImg} alt="Logo image" /></Link>
            </div>
          <div className="ms-auto mb-auto mt-auto" style={{maxWidth: "190px"}}></div>
          </div>
        </nav>*/}
      <div className="header" style={{backgroundColor: "#333"}}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="header-content">
                <div className="header-left">
                  <div className="brand-logo">
                    <Link to="/">
                      <img src={logoImg} alt="Logo image" style={{filter: 'invert(50%)'}}/>
                    </Link>
                  </div>
                </div>
                
                  { children }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
  );
}

export default Header;
