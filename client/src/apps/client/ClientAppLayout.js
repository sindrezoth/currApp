import { Outlet } from 'react-router-dom';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import HeaderMenu from './HeaderMenu.js';

const ClientAppLayout = () => {

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header><HeaderMenu /></Header>
      <Outlet />
      <Footer />
    </div>
  );
}

export default ClientAppLayout;
