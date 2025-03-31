import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminItemList from './AdminItemList.js';
import { selectAdminsResult, useGetAdminsQuery, selectAllAdmins } from '../../../features/admins/adminsApiSlice.js';
import { apiSlice } from '../../../app/api/apiSlice'
import useAuth from '../../../hooks/useAuth';

const DashAdminsList = () => {
  const you = useAuth();
  const admins = useSelector(selectAllAdmins);

  console.log(admins);

  return (
    <div className="">
      <h3>Список админов</h3>
      <ul>
      {
        //(!isLoading && isSuccess) && 
        admins?.map((admin) => {
          return <><AdminItemList key={admin.id} admin={{...admin}}/><hr/></>
        })
      }
      </ul>
      {you.roles.includes('superadmin') && <Link to="/admins/create" className="btn btn-primary border rounded-50" name="Добавить админа">+</Link> }
    </div>
  );
}
//            <div className="col-lg-3 col-md-6 border">
//              <p className="">депозит</p>
//            </div>
//            <div className='col-lg-3 col-md-12 border'>
//              {admin?.createdAt && 
//                <div className="border">{new Date(admin.createdAt).toLocaleDateString("ru-RU")}</div>}
//            </div>
//            <div className={`col-lg-2 ${true ? "bg-danger" : "bg-success"}`}>
//
//            </div>
//          </div>
//          <div className="row">
//            <div className="col-lg-7 border">
//              <p>KOSH</p>
//            </div>
//            <div className='col-lg-3 col-md-12 border'>
//              {admin?.updatedAt && 
//                <div className="border">{new Date(admin.createdAt).toLocaleDateString("ru-RU")}</div>}
//            </div>
//          </div>
//        </div>
//
//      </Link>
//    </ul>
//  </div>
//  );
//}

export default DashAdminsList;
