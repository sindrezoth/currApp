

const AnalyticsBlock = () => {
  return (
    <div className="col-xxl-12 col-xl-8">
      <div className="card home-chart">
        <div className="card-header">
          <h4 className="card-title home-chart">Аналитика</h4>
          <select className="form-select" name="report-type" id="report-select">
            <option value="1">Bitcoin</option>
            <option value="2">Litecoin</option>
          </select>

        </div>
        <div className="card-body">
          <div className=" home-chart-height">
            <div id="chartx"></div>
            <div className="row">
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="chart-price-value">
                  <span>24hr Volume</span>
                  <h5>$236,368.00</h5>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="chart-price-value">
                  <span>Marketcap</span>
                  <h5>$236.025B USD</h5>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="chart-price-value">
                  <span>24hr Volume</span>
                  <h5>56.3 BTC</h5>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="chart-price-value">
                  <span>All Time High</span>
                  <h5>$236,368.00</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsBlock;
