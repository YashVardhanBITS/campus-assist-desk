
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { requestService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/authUtils';

const RequestList = ({ type = 'all' }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [facilities, setFacilities] = useState({});
  
  const { currentUser } = useAuth();
  const location = useLocation();

  // Load requests based on type
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        let requestsData;
        
        switch (type) {
          case 'my':
            requestsData = await requestService.getUserRequests(currentUser.id);
            break;
          case 'assigned':
            requestsData = await requestService.getAssignedRequests(currentUser.id);
            break;
          case 'all':
          default:
            requestsData = await requestService.getAll();
            break;
        }
        
        // Load facility names
        const { facilities } = await import('../../data/dummyData');
        const facilityMap = {};
        facilities.forEach(facility => {
          facilityMap[facility.id] = facility.name;
        });
        
        setFacilities(facilityMap);
        setRequests(requestsData);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, [type, currentUser.id, location.key]);

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
  
  // Get status display name
  const getStatusName = (status) => {
    const statusNames = {
      unassigned: 'Unassigned',
      assigned: 'Assigned',
      progress: 'In Progress',
      closed: 'Closed',
      rejected: 'Rejected'
    };
    
    return statusNames[status] || 'Unknown';
  };

  if (loading) {
    return <div className="flex justify-center p-6">Loading requests...</div>;
  }

  if (error) {
    return (
      <div className="bg-error bg-opacity-10 text-error p-4 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      {requests.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">No requests found</p>
          {type === 'my' && (
            <Link to="/requests/new" className="btn btn-primary">
              Create New Request
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Facility</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Created</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">#{request.id}</td>
                  <td className="px-4 py-3">{request.title}</td>
                  <td className="px-4 py-3">{facilities[request.facilityId] || 'Unknown'}</td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(request.status)}>
                      {getStatusName(request.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(request.createdAt)}</td>
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
    </div>
  );
};

export default RequestList;
