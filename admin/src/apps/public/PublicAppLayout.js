import { Outlet } from 'react-router-dom';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

const PublicAppLayout = () => {
//      <Header />
//      <Footer />
  return (
    <>
      <Outlet />
    </>
  );
}

export default PublicAppLayout;
