import { useSelector } from 'react-redux';
import { selectClient } from '../../features/clients/clientSlice.js';

import profileImg from "../../images/profile/2.png";

const VerifiedAccountBlock = () => {
  const { firstname, lastname, email, verified } = useSelector(selectClient);

  return (

    <div className="col-xxl-4">
      <div className="card welcome-profile">
        <div className="card-body">
          <img src={profileImg} alt="" />
          {
            firstname || lastname ? 
              <h4>{firstname} {lastname}</h4>
            : <h4>{ email }</h4>
          }
          <p>Рады видеть вас в 21M Club</p>

          <ul>
            <li>
              {verified ?
                <>
                  <span className="verified"><i className="icofont-check-alt"></i></span>
                  <span>Верифицированный аккаунт</span>
                </>
                : <>
                  <span className="verified"><i className="icofont-uncheck-alt"></i></span>
                  <span>Не верифицированный аккаунт</span>
                </>
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VerifiedAccountBlock;
