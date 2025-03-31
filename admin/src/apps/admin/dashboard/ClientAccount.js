import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ClientAccountInfo from '../../../components/ClientAccountInfo';
import ClientAccountScript from '../../../components/ClientAccountScript';
import { useGetClientsQuery, selectClientById, selectClientsResult, selectAllClients, selectClientIds, useUpdateClientNewTraderMutation, useUpdateClientActivateMutation, useDeleteClientMutation } from '../../../features/admins/clientsApiSlice';
import { useGetAdminsQuery, selectAdminById, selectAdminsResult, selectAllAdmins, selectAdminIds } from '../../../features/admins/adminsApiSlice';
import { useAddNewScriptMutation, useGetScriptsQuery, selectScriptById } from '../../../features/scripts/scriptsApiSlice.js';
import useAuth from '../../../hooks/useAuth';
import Chart from '../../../components/Chart.js';

const ClientAccount = () => {
  const { id } = useParams();
  const you = useAuth();
  const {
    email,
    firstname,
    lastname,
    createdAt,
    updatedAt,
    deleted,
    scripts,
  } = useSelector(state => selectClientById(state, id)) || {};
  console.log(scripts);
  return (
  <div className="container ">
    <div className="row">
      <div className="col-lg-12 container">
        <div className="row">
        { email &&  
              <>
          <div className="col-lg-8 container">
            <div className="row">
              <div className="col-lg-4 border border-dark overflow-hidden">
                <div className="col-lg-12 text-dark h5">{(firstname || lastname) ? [firstname, lastname].join(" ") : email }</div>
              </div>
              <div className="col-lg-4 border border-dark">
                <div className="col-lg-12 text-dark h5">депозит</div>
              </div>
              <div className="col-lg-4 container border border-dark">
                <div className="row">
                  <div className="col-lg-6 text-dark h5">создан:  </div>
                  <div className="col-lg-6 text-dark">{createdAt ? new Date(createdAt).toLocaleDateString("ru-RU") : "нет даных"}</div>
                </div>
              </div>

              <div className="col-lg-8 border border-dark">KOSH</div>
              <div className="container border border-dark col-lg-4">
                <div className="row">
                  <div className="col-lg-6 text-dark h5">обновлён:  </div>
                  <div className="col-lg-6 text-dark">{updatedAt ? new Date(updatedAt).toLocaleDateString("ru-RU") : "нет даных"}</div>
                </div>
              </div>
              
            </div>
            <div className="col-lg-12">
            { 
              deleted ?
              <h3 className="h3 my-4">Удалён</h3> :
              <ClientAccountScript />
            }
            {
              scripts &&
              scripts.length ? 
              <>
                <h3 className="">Список активных скриптов.</h3>
                {scripts.map(script => {
                  console.log(script);
                  return <Chart name="Сумма" data={script.list} />
                })}
              </>:
              <p className="">Список скриптов пустой.</p>
            }
            </div>
          </div>
          <div className="col-lg-4 container">
            <ClientAccountInfo />
          </div>
          </>
          }
        </div>
      </div>
      <Link to="/admin/home">Назад к списку клентов</Link>
    </div>
  </div>
  );
}

export default ClientAccount;

