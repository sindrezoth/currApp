import { lazy, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import Prefetch from '../features/auth/Prefetch';

const PublicApp = lazy(() => import ('./public/PublicApp.js'));
const AdminApp = lazy(() => import ('./admin/AdminApp.js'));

const Apps = () => {
  const { roles } = useAuth();

  if(!!roles && Array.isArray(roles) && (roles.includes('admin') || roles.includes('superadmin'))) {
    return (
      <Prefetch>
        <AdminApp />
      </Prefetch>
    );
  }

  return <PublicApp/>
}

export default Apps;
