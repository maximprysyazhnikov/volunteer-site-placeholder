import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { ProfileLayout } from './ProfileLayout';
import { ProfileInfo } from './MyProfile/ProfileInfo';
import { MyRequests } from './MyProfile/MyRequests/MyRequests';
import { MyResponses } from './MyProfile/MyResponses/MyResponses';
import { userFromServer } from '../../api/user.mock';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'requests' | 'responses'>(
    'info',
  );

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ProfileLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      user={userFromServer}
      onLogout={handleLogout}
    >
      {activeTab === 'info' && <ProfileInfo />}
      {activeTab === 'requests' && <MyRequests />}
      {activeTab === 'responses' && <MyResponses />}
    </ProfileLayout>
  );
};
