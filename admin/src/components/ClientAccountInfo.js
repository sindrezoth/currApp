import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectClientById, useUpdateClientNewTraderMutation, useUpdateClientActivateMutation, useDeleteClientMutation } from '../features/admins/clientsApiSlice';
import { useGetAdminsQuery, selectAdminById, selectAdminsResult, selectAllAdmins, selectAdminIds } from '../features/admins/adminsApiSlice';
import useAuth from '../hooks/useAuth';

const ClientAccountInfo = () => {
  const { id } = useParams();
  const you = useAuth();
  const {
    firstname,
    lastname,
    email,
    phone,
    createdAt,
    updatedAt,
    trader,
    active,
    deleted,
  } = useSelector(state => selectClientById(state, id)) || {};
  const admins = useSelector(state => selectAllAdmins(state));
  const [isEdit, setIsEdit] = useState(false);

  const [newTrader, setNewTrader] = useState("");
  const [scriptTime, setScriptTime] = useState("");
  const [scriptProfit, setScriptProfit] = useState("");

  const navigate = useNavigate();

  const [
    updateClientNewTrader, {
    isLoading,
    isError,
    isUninitialized,
    isSuccess
    }
  ]= useUpdateClientNewTraderMutation();

  const handleSetTrader = e => {
    console.log(e.target.value);
    setNewTrader(e.target.value);
  }

  const handleUpdateClientNewTrader = e => {
    e.preventDefault();
    updateClientNewTrader({ id, trader: newTrader, active })
    setIsEdit(false);
  }
  const handleDeactivateClient = e => {
    e.preventDefault();
    updateClientActivate({ id, active })
  }
  const handleDeleteClient = e => {
    e.preventDefault();
    deleteClient({ id })
  }

  const handleStartScript = e => {
    e.preventDefault();
    console.log(
      "Start script"
    );
  }

  return (
    <>
    <table className="table table-striped">
      <thead>
      </thead>
      <tbody>
        <tr>
          <th scope="row">ID</th>
          <td>{id}</td>
        </tr>
        <tr>
          <th>имя: </th>
          <td>{firstname}</td>
        </tr>
        <tr>
          <th>фамилия: </th>
          <td>{lastname}</td>
        </tr>
        <tr>
          <th>телефон: </th>
          <td>{phone}</td>
        </tr>
        <tr>
          <th>почта: </th>
          <td>{email}</td>
        </tr>
        <tr>
          <th>трейдер: </th>
          <td>
            <select 
              onChange={handleSetTrader} 
              value={newTrader} 
              className="form-select" 
              aria-label="назначить тредера"
              disabled={deleted || !isEdit}
            >
              <option value={""}>назначить трейдера</option>
              {
                admins.map((admin, i) => 
                  <option 
                    key={`option${admin.username}`}
                    style={{border: '1px solid red'}}
                    className={(admin.username === you.username ? 'text-primary' : '') + (i % 2 == 0 && ' bg-secondary')} 
                    value={admin.username}
                  >
                    {admin.username} {admin.username === you.username ? 'вы' : ''}
                  </option>)
              }
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <div className="row">
      {!isEdit ? <div className="col-lg-6">
        <button
          onClick={()=>setIsEdit(true)} 
          className={`btn ${deleted ? "btn-muted" : "btn-primary"}`} 
          disabled={deleted}
        >редактировать</button>
      </div> : 

        <div className="btn-group col-lg-6">
          <button
            onClick={handleUpdateClientNewTrader} 
            className={`btn ${deleted ? "btn-muted" : "btn-primary"}`} 
            disabled={deleted || !newDataReady}
          >сохранить</button>
          <button
            onClick={()=>setIsEdit(false)} 
            className={`btn ${deleted ? "btn-muted" : "btn-warning"}`} 
            disabled={deleted}
          >отменить</button>
        </div>}
      <div className="col-lg-6">
        <div className="float-end btn-group">
          {/*<button 
                  onClick={handleDeactivateClient} 
                  className="btn btn-warning"
                >{ active ? "Деактивировать" : "Активировать" }</button>*/}
          <button 
            onClick={handleDeleteClient} 
            className={`btn ${deleted ? "btn-muted" : "btn-danger"}`} 
            disabled={deleted}
          >Удалить</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default ClientAccountInfo;
