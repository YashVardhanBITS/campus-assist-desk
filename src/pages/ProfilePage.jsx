
import React from 'react';
import ProfilePage from '../components/Profile/ProfilePage';
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';

const ProfilePageContainer = () => {
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="main-content">
          <ProfilePage />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContainer;
