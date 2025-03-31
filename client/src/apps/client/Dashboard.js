import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth.js';
import { useGetClientAccountDetailsMutation } from '../../features/clients/clientApiSlice.js'

import ChartsContainer from '../../components/ChartsContainer.js';
import VerifiedAccountBlock from './VerifiedAccountBlock.js';
import BalanceBlock from './BalanceBlock.js';
import AccountInfoBlock from './AccountInfoBlock.js';
import AnalyticsBlock from './AnalyticsBlock.js';

import logoim from '../../images/logo.png';
import logoImgI from "../../images/logoi.png";
import profileImg from "../../images/profile/2.png";

//import '../../css/style.css';
//import '../../theme.css'

const Dashboard = () => {
  const [{ email, phone, country, traderId, firstname, lastname, wallet }, setUserInfo] = useState({email:'undef'});
  const [ getClientAccountDetails, { isLoading }] = useGetClientAccountDetailsMutation();
  const [trader, setTrader] = useState({});


  useEffect(() => {
    async function getaa() {
      const res = await getClientAccountDetails();
      setUserInfo(res.data);
    }

    getaa();
  }, [])

  return (
  <>
    <div className='show' id="main-wrapper">
      <div className="content-body" data-bs-theme="dark">
        <div className="container">
          <div className="row">

            <ChartsContainer />

            <VerifiedAccountBlock />

            <BalanceBlock />
            
            <AccountInfoBlock />

            {/*<AnalyticsBlock />*/}

          </div>
        </div>
      </div>
    </div>
  </>);
}

export default Dashboard;
