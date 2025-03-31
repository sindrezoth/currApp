import React, { useEffect, useState, useRef } from 'react';
import Chart from './Chart';
import ApexChart from 'react-apexcharts';

const ChartsContainer = () => {
  const [series, setSeries] = useState([
    { alias: 'Bitcoin' , name: 'BTCUSDT', data: [] , id: 'btc'},//
    { alias: 'Ethereum' , name: 'ETHUSDT', data: [] , id: 'eth'},//
    { alias: 'TetherUS' , name: 'XRPUSDT', data: [] , id: 'usdt'},//
  ]);

  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const isComponentMounted = useRef(true);
  const lastUpdate = useRef(0);
  const delay = 1000;

  useEffect(() => {
    const connectWebSocket = () => {
      //if (wsRef.current) return; // Prevent multiple WebSocket instances
      
      // check current connection state
      if(wsRef.current) {
        console.log(wsRef.current.readyState === WebSocket.CONNECTING);
        console.log(wsRef.current.readyState === WebSocket.OPEN);

        if([WebSocket.OPEN, WebSocket.CONNECTING].some(state => {
          console.log(state);
          console.log(wsRef.current.readyState === state);
          return wsRef.current.readyState === state;
        })) {
          console.log('IS ALREADY CONNECTED')
        }

      }
      //console.log('🔗 Connecting WebSocket...');
      wsRef.current = new WebSocket('wss://stream.bybit.com/v5/public/spot');

      wsRef.current.onopen = () => {
        //console.log('✅ WebSocket connected');
        reconnectAttempts.current = 0; // Reset retries
        if(wsRef.current.readyState === WebSocket.OPEN){
          wsRef.current.send(
            JSON.stringify({
              op: 'subscribe',
              args: ['tickers.BTCUSDT', 'tickers.ETHUSDT', 'tickers.XRPUSDT'],
            })
          );

        }
      };

      wsRef.current.onmessage = (event) => {
        const timestamp = Date.now();
        if(lastUpdate.current + delay > timestamp) return;

        lastUpdate.current = timestamp;
        const data = JSON.parse(event.data);
        if (data.topic && data.data) {
          const { topic, data: tickData } = data;
          const symbol = topic.split('.')[1];
          const price = parseFloat(tickData.lastPrice);
          const timestamp = Date.now();

          setSeries((prev) =>
            prev.map((s) =>
              s.name === symbol
                ? { ...s, data: [...s.data.slice(-49), [timestamp, price]] }
                : s
            )
          );
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        //console.log(error.readyState)
        attemptReconnect();
      };

      wsRef.current.onclose = () => {
        if (isComponentMounted.current) {
          //console.warn('⚠️ WebSocket closed, will attempt to reconnect...');
          attemptReconnect();
        }
      };
    };

    const attemptReconnect = () => {
      if (reconnectAttempts.current >= 5) {
        //console.error('🚨 Max reconnection attempts reached. Stopping.');
        return;
      }

      const recDelay = Math.min(5000, 1000 * 2 ** reconnectAttempts.current); // Exponential backoff
      reconnectAttempts.current += 1;

      //console.log(`🔄 Reconnecting in ${recDelay / 1000}s...`);
      reconnectTimeoutRef.current = setTimeout(() => {
        wsRef.current = null; // Reset WebSocket instance
        connectWebSocket();
      }, recDelay);
    };

    connectWebSocket();

    return () => {
      //console.log('🛑 Cleaning up WebSocket...');
      isComponentMounted.current = false;
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      { series.map(({id, data, name, alias}) => <Chart id={id} key={id} data={data} name={name} alias={alias} />) }
    </>
  );
};

export default ChartsContainer;

