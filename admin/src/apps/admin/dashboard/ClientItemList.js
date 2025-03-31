import { Link } from 'react-router-dom';

const ClientItemList = ({ client }) => {
  const clientKeys = Object.keys(client).filter(key => !key.match(/_/g));
//console.log(Object.keys(client).filter(key => !key.match(/_/g)));

  return (
    <>
      {
      <li>
        <Link to={"/clients/" + client.id}>
            <div className="container border">
              <div className="row">
                <div className="col-lg-4 col-md-6 border">
                  {(client?.firstname || client?.lastname) ? 
                    <p>{client.firstname} {client.lastname}</p> :
                    <p>{client.email}</p>
                  }
                </div>
                <div className="col-lg-3 col-md-6 border">
                  <p className="">депозит</p>
                </div>
                <div className='col-lg-3 col-md-12 border'>
                  {client?.createdAt && 
                    <div className="border">{new Date(client.createdAt).toLocaleDateString("ru-RU")}</div>}
                </div>
                <div className={`col-lg-2 ${true ? "bg-danger" : "bg-success"}`}>
                      
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 border">
                  <p>KOSH</p>
                </div>
                <div className='col-lg-3 col-md-12 border'>
                  {client?.updatedAt && 
                    <div className="border">{new Date(client.updatedAt).toLocaleDateString("ru-RU")}</div>}
                </div>
              </div>
            </div>

        </Link>
      </li>

      }
    </>
  );
}

export default ClientItemList;
