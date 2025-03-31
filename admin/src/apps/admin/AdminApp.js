import { Routes, Route, Navigate, Link } from 'react-router-dom';

import AdminHome from './AdminHome';
import AdminAppLayout from './AdminAppLayout.js';
import ClientsListPage from './dashboard/ClientsListPage.js';
import ClientAccount from './dashboard/ClientAccount.js';
import AdminsListPage from './dashboard/AdminsListPage.js';
import AdminAccount from './dashboard/AdminAccount.js';
import AdminCreate from './AdminCreate.js';

//import RegisterForm from '../../features/auth/RegisterForm.js';
import Layout from '../../components/Layout';

const AdminApp = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminAppLayout />}>
        <Route index element={<Link to="/home">Home</Link>} />
        <Route path="home" element={<AdminHome />} />
        <Route path="clients" element={<ClientsListPage />} />
        <Route path="clients/:id" element={<ClientAccount />} />
        
        <Route path="admins" element={<AdminsListPage />} />
        <Route path="admins/:username" element={<AdminAccount />} />
        <Route path="admins/create" element={<AdminCreate />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminApp;

