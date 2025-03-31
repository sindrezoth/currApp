import { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

import Dashboard from './dashboard/Dashboard.js';

const AdminHome = () => {
  const { username } = useAuth();

  return (
    <main>
      <Dashboard />
    </main>
  );
}

export default AdminHome;


