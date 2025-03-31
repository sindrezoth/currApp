import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import useAuth from './hooks/useAuth.js';

import Apps from './apps/Apps.js';
import Testapp from './Testapp.js';

import RegisterForm from './features/auth/RegisterForm.js';
import Login from './features/auth/Login';

import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'

import useTitle from './hooks/useTitle';

//import './theme.css';

function App() {
  useTitle('21M Club');

  return (
    <Routes>
      {/*<Route path="/" element={<Testapp />} />*/}
      {
        <Route element={<PersistLogin />}>
          <Route path="/*" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Apps />
            </Suspense> }>
          </Route>
        </Route>
      }
    </Routes >
  );
}

export default App;

