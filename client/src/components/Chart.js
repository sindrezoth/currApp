import React, { useEffect, useState, useRef } from 'react';
import ApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import useWebSocketByBitConnection from '../hooks/useWebSocketByBitConnection';
import useFetchApiByBit from '../hooks/useFetchApiByBit';

const Chart = ({ name, id, data, alias }) => {
  //const [series] = 
  //useWebSocketByBitConnection();
  //useFetchApiByBit();
  
  const chartRef = useRef(null);
  useEffect(() => {
    ApexCharts.exec(`crypto-prices-${id}`, 'updateSeries', [{ name, data }], false);
  }, [data]);

  const chartOptions={
    chart: { 
      id: `crypto-prices-${id}`, 
      animations: { enabled: true, }, //dynamicAnimation: { speed: 100 } }, 
      toolbar: { show: false }, 
      zoom: { enabled: false } 
      
    },
    xaxis: { type: 'datetime', tickAmount: 6, /* labels: { datetimeUTC: false } */ },
    yaxis: { title: { text: 'Price (USDT)' } },
    stroke: { curve: 'smooth' },
  };

  return (
      <div className="col-xxl-4 col-xl-4 col-lg-6">
        <div className={`price-widget bg-${id}`}>
          <a href="price-details.html">
            <div className="price-content">
              <div className="icon-title" style={{zIndex: "100"}}>
                <i className={`cc ${id.toUpperCase()}-alt`}></i>
                <span>{ alias }</span>
              </div>
            </div>
            <div id="chart">

              {!data?.length > 0 ? <p className='text-center text-white t-3'>Chart is loading...</p>: 
              
                <ApexChart
                type="line"
                height={200}
                series={[{ name, data }]}
                options={chartOptions}
              />
              
              }
            </div>
          </a>
        </div>
      </div>
  );
};

export default Chart;
