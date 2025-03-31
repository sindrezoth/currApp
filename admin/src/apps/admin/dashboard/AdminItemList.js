import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AdminItemList = ({admin}) => {
  const a = useAuth();

  return (
    <>
      {
        <li>
          <Link to={"/admins/" + admin.username}>
            <div className="container border">
              <div className="row">
                <div className="col-lg-12 col-md-12 d-flex justify-content-between border">
                  <span>{admin.username}</span>
                  {admin.username === a.username && <span>вы</span> }
                </div>
              </div>
            </div>
          </Link>
        </li>
      }
    </>
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

export default AdminItemList;
