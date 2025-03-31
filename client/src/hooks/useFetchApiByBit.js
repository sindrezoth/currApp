import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';

const useFetchApiByBit = () => {
  const [series, setSeries] = useState([
    { name: 'BTCUSDT', data: [] },
    //{ name: 'ETHUSDT', data: [] },
    //{ name: 'XRPUSDT', data: [] },
  ]);

  const fetchData = async (symbol) => {
    try {
      const oneMonthAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60); // 1 month in seconds
      const interval = '1h'; // 1 hour candlesticks (adjust as needed)
      const limit = 720; // Number of data points (e.g., 720 points for 30 days of 1-hour data)

      const response = await axios.get('https://api.bybit.com/v2/public/kline/list', {
        params: {
          symbol,
          interval,
          from: oneMonthAgo,
          limit,
        },
      });

      const klineData = response.data.result;
      const formattedData = klineData.map((kline) => [
        kline.open_time * 1000, // Convert open_time to milliseconds for ApexCharts
        parseFloat(kline.close), // Using close price as the value for chart
      ]);

      setSeries((prev) =>
        prev.map((s) => {
          if (s.name === symbol) {
            return { ...s, data: formattedData };
          }
          return s;
        })
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('BTCUSDT');
    fetchData('ETHUSDT');
    fetchData('XRPUSDT');
  }, []);

  return [series];
};

export default useFetchApiByBit;
