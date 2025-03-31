import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../features/auth/Login';
import Layout from '../../components/Layout';
import PublicAppLayout from './PublicAppLayout.js';

const PublicApp = () => {
  console.log('publicApp')
  return (
    <Routes>
      <Route element={<PublicAppLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default PublicApp;

