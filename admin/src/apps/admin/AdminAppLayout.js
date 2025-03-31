import { Outlet } from 'react-router-dom';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

const AdminAppLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default AdminAppLayout;
