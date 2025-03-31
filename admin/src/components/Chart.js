import React, { useEffect, useState, useRef, memo } from 'react';
import ApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

const toDateTimeLocale = d => new Date(d - new Date(d).getTimezoneOffset() * 60000).toISOString().slice(0, -8);

const Chart = memo(function Chart({ name, id, data, alias }) {
  const chartRef = useRef(null);

  useEffect(() => {
    ApexCharts.exec(`${id}`, 'updateSeries', [{ name, data }], false);
  }, [data]);

  const chartOptions={
    chart: { 
      id, 
      animations: { enabled: true, }, 
      toolbar: { show: false }, 
      zoom: { enabled: false } ,
    
    },
    stroke: {
      show: true,
      curve: 'straight',
      lineCap: 'butt',
      colors: undefined,
      width: 1,
      dashArray: 0, 
    },
    xaxis: { 
      type: 'datetime', 
      tickAmount: 6, 
    },
    yaxis: { 
      type: 'numeric', 
      title: { text: 'Price (USDT)' },
      labels: { 
        formatter: (val) => val.toFixed(2)
      }
    }
  };

  return (
    <div className="col-xxl-12 col-xl-12 col-lg-12">
      <div className={`price-widget`}>
        {/*<div className="price-content">
            <div className="icon-title" style={{zIndex: "100"}}>
              <i className={`cc ${id.toUpperCase()}-alt`}></i>
              <span>{ alias }</span>
            </div>
          </div>*/}
        <div id="chart">

          {!data?.length > 0 ? <p className='text-center text-white t-3'>Chart is loading...</p>: 

            <ApexChart
              type="line"
              height={400}
              series={[{ name, data: data.map(item => [toDateTimeLocale(item[0]), item[1]]) }]}
              options={chartOptions}
            />

          }
        </div>
      </div>
    </div>
  );
});

export default Chart;
