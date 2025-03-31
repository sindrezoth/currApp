import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import useAuth from './hooks/useAuth.js';
import './App.css';

import Apps from './apps/Apps.js';
import PersistLogin from './features/auth/PersistLogin'

import useTitle from './hooks/useTitle';

function App() {
  const {username} = useAuth();
  useTitle('Adminochka: ' + username);

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/*" element={
          <Suspense fallback={<div className="text-dark">Загрузка страницы...</div>}>
            <Apps />
          </Suspense> }>
        </Route>
      </Route>
    </Routes >
  );
}

export default App;

