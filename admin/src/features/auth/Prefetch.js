import { store } from '../../app/store';
import { notesApiSlice } from '../notes/notesApiSlice';
import { clientsApiSlice } from '../admins/clientsApiSlice';;
import { scriptsApiSlice } from '../scripts/scriptsApiSlice';;
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Prefetch = ({children}) => {
  const dispatch = useDispatch();
  console.log('prefetch');

  useEffect(() => {
    //store.
    const clientsSub = dispatch(clientsApiSlice.endpoints.getClients.initiate());
    const adminsSub = dispatch(clientsApiSlice.endpoints.getAdmins.initiate());
    const scriptsSub = dispatch(scriptsApiSlice.endpoints.getClients.initiate());
    //dispatch(clientsApiSlice.util.prefetch('getClients', 'clientsList', { force: true }));
    //store.dispatch(clientsApiSlice.util.prefetch('getClients', 'clientsList', { force: true }));
    return () => [clientsSub.unsubscribe(), adminsSub.unsubscribe()]; 
  }, [dispatch]);

  return children;
}

export default Prefetch;
