import { useSelector } from 'react-redux';
import { selectClient } from '../../features/clients/clientSlice.js';

const BalanceBlock = () => {
  const { invested } = useSelector(selectClient);

  //const { invested } = { invested: [{
  //  coin: 'btc',
  //  id: 0
  //  invest:  {
  //    currency: 'usd',
  //    amount: 500 
  //  },
  //  difference: {
  //    amount: 100
  //  }
  //  }]};
  //console.log(client);

  return (
    <div className="col-xxl-4 col-lg-6">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Баланс</h4>
        </div>
        { (!!invested || !invested?.length) && <div className="card-body">
          <div className="row align-items-center">
            <div className="col-xxl-12 col-xl-12 col-lg-12">
              <ul className="balance-widget mb-3">
                <li>
                  <div className="icon-title">
                    <span className="text-light">Инвестиций пока что нет.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        }

        {invested?.length !== 0 && 
          invested?.map(i => <div className="card-body">
          <div className="row align-items-center">
            <div className="col-xxl-12 col-xl-12 col-lg-12">

              <ul className="balance-widget mb-3">
                <li>
                  <div className="icon-title">
                    <i className={`cc ${i.invest.currency.toUpperCase()}`}></i>
                    <span>Выручка</span>
                  </div>
                  <div className="text-right">
                    <h5>{i.difference.amount} {i.invest.currency.toUpperCase()}</h5>
                    <span>{i.difference.amount} {i.invest.currency.toUpperCase()}T</span>
                  </div>
                </li>
                <li>
                  <div className="icon-title">
                    <i className={`cc ${i.invest.currency.toUpperCase()}`}></i>
                    <span>Инвестировано</span>
                  </div>
                  <div className="text-right">
                    <h5>{i.invest.amount} {i.invest.currency.toUpperCase()}</h5>
                    <span>{i.invest.amount} {i.invest.currency.toUpperCase()}T</span>
                  </div>
                </li>
              </ul>
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="balance-chart">
                  <div id="balance-chart"></div>
                  <h4>Общий баланс = $ {i.invest.amount + i.difference.amount} {i.invest.currency.toUpperCase()}</h4>
                </div>
              </div>
            </div>
          </div>

        </div>)}
      </div>
    </div>
  );
}

export default BalanceBlock;
