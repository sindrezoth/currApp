import { useState, useEffect, useRef } from 'react';
import useWebSocket from './useWebSocket.js';

const coins = [{ name: 'Bitcoin', id: 'btc' },
    //{ name: 'Etheium', id: 'ETH' },
  ];

const useWebSocketByBitConnection = () => {
  const [series, setSeries] = useState(coins.map(({name, id}) => ({ name, bybitName: `${id.toUpperCase()}USDT`, id, data: [] })));
  const { lastMessage, sendMessage, ws } = useWebSocket(
    'wss://stream.bybit.com/v5/public/spot',
    {
      onMessage(event) {
        console.log('onmessage')
        console.log(event);
          //const data = JSON.parse(event.data);
          //if (data.topic && data.data) {
          //  const { topic, data: tickData } = data;
          //  const symbol = topic.split('.')[1];
          //
          //  const price = tickData.lastPrice ? parseFloat(tickData.lastPrice) : null;
          //  if(price === null || isNaN(price)) return;
          //
          //  setSeries((prev) =>
          //    prev.map((s) => {
          //      if(s.bybitName === symbol) {
          //        const newData = [...s.data, [timestamp, price]];
          //
          //        const maxPoints = 1000;
          //        return  { ...s, data: newData.slice(-maxPoints) };
          //      }
          //      return s;
          //    })
          //  );
          //}
        },
        onOpen(wsRef) {
        console.log('onopenasdf')

          //sendMessage(
          //    JSON.stringify({
          //      op: 'subscribe',
          //      args: series.map(ser => "tickers." + ser.bibytName)//['tickers.BTCUSDT', 
          //      //  'tickers.ETHUSDT', 'tickers.XRPUSDT'
          //  
          //    }))
          //try {
            //wsRef.send(
            //  JSON.stringify({
            //    op: 'subscribe',
            //    args: series.map(ser => "tickers." + ser.bibytName)//['tickers.BTCUSDT', 
            //    //  'tickers.ETHUSDT', 'tickers.XRPUSDT'
            //
            //  })
            //);
          //}
          //catch (err) {
          //  console.log(err);
          //}
        }
    }
  )

  useEffect(() => {
    console.log('series setted', series);
  }, [series])


  return [series];
}

export default useWebSocketByBitConnection;
