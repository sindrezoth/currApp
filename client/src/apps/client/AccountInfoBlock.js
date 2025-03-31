import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectClient } from '../../features/clients/clientSlice.js';

const AccountInfoBlock = () => {
  const {email, phone, trader, country } = useSelector(selectClient);
  const isLoading = false;
  
  return (

    <div className="col-xxl-4 col-xl-6 col-lg-6">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Информация об аккаунте</h4>
          <Link to="./profile" className="btn btn-primary">Править</Link>
        </div>
        <div className="card-body">
          <form className="row">

            { isLoading && <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6"><p>Загрузка...</p></div> }
            { !isLoading && 
              <>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                  <div className="user-info">
                    <span>EMAIL ADDRESS</span>
                    <h4>{ email }</h4>
                  </div>
                </div>
                <div className="col-xxl-12 col-xl-6 col-lg-12 col-md-6">
                  <div className="user-info">
                    <span>Страна регистрации</span>
                    <h4>{ country && country.label }</h4>
                  </div>
                </div>
                <div className="col-xxl-12 col-xl-6 col-lg-12 col-md-6">
                  <div className="user-info">
                    <span>Ваш трейдер</span>
                    <h4>{ trader ? trader.name : 'ожидается...' }</h4>
                  </div>
                </div>
              </>
            }
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default AccountInfoBlock;
