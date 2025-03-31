import { Outlet } from 'react-router-dom';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

const PublicAppLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
        
      <Header />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default PublicAppLayout;
