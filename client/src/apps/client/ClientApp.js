import { Routes, Route, Navigate, Link } from 'react-router-dom';

import ClientHome from './ClientHome';
import ClientAccount from './ClientAccount';
import ClientPayments from './ClientPayments';
import ClientAppLayout from './ClientAppLayout.js';
import Dashboard from './Dashboard';
import Support from './Support.js';

import RegisterForm from '../../features/auth/RegisterForm.js';
import Layout from '../../components/Layout';

const ClientApp = () => {
  return (
    <Routes>
      <Route path="/*" element={<ClientAppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ClientAccount />} />
        {/*<Route index element={<main className=""><Link to="/home">Личный кабинет</Link></main>} />
        <Route path="home" element={<ClientHome />} />
        <Route path="payments" element={<ClientPayments />} />
        <Route path="support" element={<Support />} />*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default ClientApp;

