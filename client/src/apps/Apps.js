import { lazy, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';

const PublicApp = lazy(() => import ('./public/PublicApp.js'));
const ClientApp = lazy(() => import ('./client/ClientApp.js'));

const Apps = () => {
  const { email } = useAuth();
  console.log(email);
  useEffect(() => {
    console.log(email);
  }, [email])

  if(email) {
    return <ClientApp />;
  }

  return <PublicApp/>;
}

export default Apps;
