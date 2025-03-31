import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../features/auth/Login';
import RegisterForm from '../../features/auth/RegisterForm.js';
import Layout from '../../components/Layout';
import Home from '../../components/Home';
import PublicAppLayout from './PublicAppLayout.js';
import SignUp from './SignUp'
import SignIn from './SignIn'

const PublicApp = () => {

return (
    <Routes>
      <Route element={<PublicAppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="privacy-policy " element={<SignIn />} />
        <Route path="terms-of-use" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default PublicApp;

