import { store } from '../../app/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  console.log('prefetch');

  useEffect(() => {
  }, []);

  return <Outlet />;
}

export default Prefetch;
