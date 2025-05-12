
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService, facilityService } from '../services/api';
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  
  const { currentUser } = useAuth();

  // Load admin data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users and facilities
        const usersData = await userService.getAll();
        const facilitiesData = await facilityService.getAll();
        
        setUsers(usersData);
        setFacilities(facilitiesData);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Check if user has admin permissions
  if (currentUser?.role !== 'admin') {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="md:ml-64 flex flex-col min-h-screen">
          <Navbar />
          <div className="main-content">
            <div className="card">
              <h2 className="text-xl font-bold mb-2">Access Denied</h2>
              <p>You do not have permission to view this page.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="main-content">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          
          {/* Tab Navigation */}
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 ${
                activeTab === 'users' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === 'facilities' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('facilities')}
            >
              Facilities
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center p-6">Loading data...</div>
          ) : (
            <>
              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">Manage Users</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">ID</th>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Email</th>
                          <th className="px-4 py-2 text-left">Role</th>
                          <th className="px-4 py-2 text-left">Joined</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3">{user.id}</td>
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3 capitalize">{user.role}</td>
                            <td className="px-4 py-3">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-primary hover:underline mr-2">
                                Edit
                              </button>
                              <button className="text-error hover:underline">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Facilities Tab */}
              {activeTab === 'facilities' && (
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">Manage Facilities</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">ID</th>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Code</th>
                          <th className="px-4 py-2 text-left">Location</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {facilities.map((facility) => (
                          <tr key={facility.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3">{facility.id}</td>
                            <td className="px-4 py-3">{facility.name}</td>
                            <td className="px-4 py-3">{facility.code}</td>
                            <td className="px-4 py-3">{facility.location}</td>
                            <td className="px-4 py-3">
                              <button className="text-primary hover:underline mr-2">
                                Edit
                              </button>
                              <button className="text-error hover:underline">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
