//import { useState, useEffect, useRef } from 'react';
//
//const useWebSocket = (
//  url,
//  { onOpen, onMessage, onError, onClose, reconnectInterval = 3000 } = {},
//  delay = 2000 
//) => {
//  const [lastMessage, setLastMessage] = useState(null);
//  const ws = useRef(null);
//  const reconnectTimeout = useRef(null);
//  const lastUpdateRef = useRef(0);
//  const isComponentMounted = useRef(true);
//
//  const connect = () => {
//    console.log(isComponentMounted.current)
//    if(isComponentMounted.current) return;
//    ws.current = new WebSocket(url);
//
//    ws.current.onopen = () => {
//      console.log('WebSocket connected');
//      if (onOpen) onOpen();
//    };
//
//    ws.current.onmessage = (event) => {
//      // Save the last message (you can adjust parsing as needed)
//      const timestamp = Date.now();
//      if(lastUpdateRef.current + delay > timestamp) return;
//      lastUpdateRef.current = timestamp;
//      console.log(timestamp);
//
//      setLastMessage(event.data);
//      if (onMessage) onMessage(event);
//    };
//
//    ws.current.onerror = (error) => {
//      console.error('WebSocket error:', error);
//      if (onError) onError(error);
//    };
//
//    ws.current.onclose = (event) => {
//      console.warn('WebSocket closed:', event);
//      if (onClose) onClose(event);
//      // Attempt to reconnect after a delay
//      reconnectTimeout.current = setTimeout(() => {
//        connect();
//      }, reconnectInterval);
//    };
//  };
//
//  useEffect(() => {
//    connect();
//    // Clean up on unmount
//    return () => {
//      clearTimeout(reconnectTimeout.current);
//      if (ws.current) {
//        ws.current.close();
//      }
//    };
//  }, [url]);
//
//  // Helper function to send a message
//  const sendMessage = (message) => {
//    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
//      ws.current.send(message);
//    } else {
//      console.error('WebSocket is not open. Unable to send message:', message);
//    }
//  };
//
//  return { lastMessage, sendMessage, ws: ws.current };
//};
//
//
//export default useWebSocket;



import { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = (url, { onMessage, onOpen, onError, onClose, reconnectInterval = 3000 } = {}, delay=2000) => {
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);
  const [lastMessage, setLastMessage] = useState(null);
  const lastUpdateRef = useRef(0);

  // Function to connect to WebSocket (defined outside of useEffect to prevent re-creation)
  const connect = useCallback(() => {
    // If there's already an open WebSocket, close it before creating a new one
    if (ws.current) {
      if (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING) {
        console.log('Closing existing WebSocket connection before reopening...');
        ws.current.close();  // Close existing WebSocket connection
      }
      ws.current = null;  // Clear reference
    }

    // Create a new WebSocket connection
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      console.log(ws.current.readyState)
      if (onOpen) onOpen(ws.current);
    };

    ws.current.onmessage = (event) => {
      const timestamp = Date.now();
      if(lastUpdateRef.current + delay > timestamp) return;
      lastUpdateRef.current = timestamp;

      setLastMessage(event.data);
      if (onMessage) onMessage(event);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(error);
    };

    ws.current.onclose = (event) => {
      console.warn('WebSocket closed:', event);
      if (onClose) onClose(event);
      ws.current = null; // Clear reference
      reconnectTimeout.current = setTimeout(connect, reconnectInterval); // Reconnect after delay
    };
  }, [url, onMessage, onOpen, onError, onClose, reconnectInterval]);

  useEffect(() => {
    connect(); // Establish connection

    // Clean up on unmount (or page reload)
    return () => {
      clearTimeout(reconnectTimeout.current);  // Clear reconnection timeout
      if (ws.current) {
        ws.current.close();  // Close WebSocket connection on unmount
        ws.current = null;  // Clear reference to prevent issues on reload
      }
    };
  }, [connect]); // connect is memoized, so this effect runs only once

  // Function to send messages (prevents errors if WS is closed)
  const sendMessage = useCallback((message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.error('WebSocket is not open. Cannot send message:', message);
    }
  }, []);

  return { lastMessage, sendMessage, ws: ws.current };
};

export default useWebSocket;
