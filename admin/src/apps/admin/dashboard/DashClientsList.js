import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ClientItemList from './ClientItemList.js';
import { selectClientsResult, useGetClientsQuery, selectAllClients } from '../../../features/admins/clientsApiSlice.js';
import { apiSlice } from '../../../app/api/apiSlice'

const DashClientsList = () => {
  const clients = useSelector(selectAllClients);

  return (
    <>
      {
        clients?.map((client) => <><ClientItemList key={client.id} client={{...client}}/><hr/></>)
      }
    </>
  );
}

export default DashClientsList;
