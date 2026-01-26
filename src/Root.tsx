import { StrictMode } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import App from './App';
import HomePage from './components/HomePage/HomePage';

import AuthLayout from './pages/auth/AuthLayout';
import SignInPage from './pages/auth/signin/SignInPage';
import SignUpStep1 from './pages/auth/signup/SignUpStep1';
import SignUpStep2 from './pages/auth/signup/SignUpStep2';
import SignUpStep3 from './pages/auth/signup/SignUpStep3';
import SignUpStep4 from './pages/auth/signup/SignUpStep4';
import { ProfilePage } from './pages/profile/ProfilePage';

import { AuthProvider } from './context/AuthContext';

export const Root = () => (
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='home' element={<Navigate to='/' replace />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='/signin' element={<SignInPage />} />

            <Route path='signup'>
              <Route index element={<Navigate to='step-1' />} />
              <Route path='step-1' element={<SignUpStep1 />} />
              <Route path='step-2' element={<SignUpStep2 />} />
              <Route path='step-3' element={<SignUpStep3 />} />
              <Route path='step-4' element={<SignUpStep4 />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
