
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestService, reportService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  isAdmin, 
  isFacilityHead, 
  isAssignee
} from '../utils/authUtils';
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch different data based on user role
        if (isAdmin() || isFacilityHead()) {
          // For admins and facility heads, get overall stats
          const requests = await requestService.getAll();
          setRecentRequests(requests.slice(0, 5));
          
          // Generate stats summary
          const statsData = {
            total: requests.length,
            unassigned: requests.filter(r => r.status === 'unassigned').length,
            inProgress: requests.filter(r => r.status === 'progress').length,
            closed: requests.filter(r => r.status === 'closed').length
          };
          setStats(statsData);
        } else if (isAssignee()) {
          // For assignees, get assigned requests
          const assignedRequests = await requestService.getAssignedRequests(currentUser.id);
          setRecentRequests(assignedRequests.slice(0, 5));
          
          // Generate stats summary
          const statsData = {
            total: assignedRequests.length,
            assigned: assignedRequests.filter(r => r.status === 'assigned').length,
            inProgress: assignedRequests.filter(r => r.status === 'progress').length,
            closed: assignedRequests.filter(r => r.status === 'closed').length
          };
          setStats(statsData);
        } else {
          // For regular users, get their requests
          const userRequests = await requestService.getUserRequests(currentUser.id);
          setRecentRequests(userRequests.slice(0, 5));
          
          // Generate stats summary
          const statsData = {
            total: userRequests.length,
            open: userRequests.filter(r => r.status !== 'closed' && r.status !== 'rejected').length,
            closed: userRequests.filter(r => r.status === 'closed').length,
            rejected: userRequests.filter(r => r.status === 'rejected').length
          };
          setStats(statsData);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [currentUser.id]);

  // Get status badge class
  const getStatusBadge = (status) => {
    const statusClasses = {
      unassigned: 'badge-unassigned',
      assigned: 'badge-assigned',
      progress: 'badge-progress',
      closed: 'badge-closed',
      rejected: 'badge-rejected'
    };
    
    return `badge ${statusClasses[status] || 'badge-unassigned'}`;
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="main-content">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {loading ? (
            <div className="flex justify-center p-6">Loading dashboard...</div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="card p-4">
                  <h3 className="text-gray-500 text-sm">Total Requests</h3>
                  <p className="text-2xl font-bold">{stats?.total || 0}</p>
                </div>
                
                {isAdmin() || isFacilityHead() ? (
                  <>
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">Unassigned</h3>
                      <p className="text-2xl font-bold text-yellow-500">{stats?.unassigned || 0}</p>
                    </div>
                    
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">In Progress</h3>
                      <p className="text-2xl font-bold text-blue-500">{stats?.inProgress || 0}</p>
                    </div>
                    
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">Closed</h3>
                      <p className="text-2xl font-bold text-green-500">{stats?.closed || 0}</p>
                    </div>
                  </>
                ) : isAssignee() ? (
                  <>
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">Assigned</h3>
                      <p className="text-2xl font-bold text-yellow-500">{stats?.assigned || 0}</p>
                    </div>
                    
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">In Progress</h3>
                      <p className="text-2xl font-bold text-blue-500">{stats?.inProgress || 0}</p>
                    </div>
                    
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">Closed</h3>
                      <p className="text-2xl font-bold text-green-500">{stats?.closed || 0}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">Open Requests</h3>
                      <p className="text-2xl font-bold text-blue-500">{stats?.open || 0}</p>
                    </div>
                    
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">Closed</h3>
                      <p className="text-2xl font-bold text-green-500">{stats?.closed || 0}</p>
                    </div>
                    
                    <div className="card p-4">
                      <h3 className="text-gray-500 text-sm">Rejected</h3>
                      <p className="text-2xl font-bold text-red-500">{stats?.rejected || 0}</p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Quick Actions */}
              <div className="card mb-6">
                <div className="card-header">
                  <h2 className="card-title">Quick Actions</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {!isAdmin() && !isFacilityHead() && (
                    <Link to="/requests/new" className="btn btn-primary">
                      Create New Request
                    </Link>
                  )}
                  
                  <Link to="/requests/my" className="btn btn-outline">
                    My Requests
                  </Link>
                  
                  {isAssignee() && (
                    <Link to="/requests/assigned" className="btn btn-outline">
                      Assigned to Me
                    </Link>
                  )}
                  
                  {(isAdmin() || isFacilityHead()) && (
                    <Link to="/requests" className="btn btn-outline">
                      All Requests
                    </Link>
                  )}
                  
                  {(isAdmin() || isFacilityHead()) && (
                    <Link to="/reports" className="btn btn-outline">
                      View Reports
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Recent Requests */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Recent Requests</h2>
                </div>
                
                {recentRequests.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-gray-500">No requests found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">ID</th>
                          <th className="px-4 py-2 text-left">Title</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentRequests.map((request) => (
                          <tr key={request.id} className="border-t">
                            <td className="px-4 py-3">#{request.id}</td>
                            <td className="px-4 py-3">{request.title}</td>
                            <td className="px-4 py-3">
                              <span className={getStatusBadge(request.status)}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <Link 
                                to={`/requests/${request.id}`} 
                                className="text-primary hover:underline"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                <div className="card-footer mt-4 pt-4 border-t text-right">
                  {!isAdmin() && !isFacilityHead() ? (
                    <Link to="/requests/my" className="text-primary hover:underline">
                      View all my requests →
                    </Link>
                  ) : isAssignee() ? (
                    <Link to="/requests/assigned" className="text-primary hover:underline">
                      View all assigned requests →
                    </Link>
                  ) : (
                    <Link to="/requests" className="text-primary hover:underline">
                      View all requests →
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
