
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestList from '../components/Requests/RequestList';
import RequestForm from '../components/Requests/RequestForm';
import RequestDetail from '../components/Requests/RequestDetail';
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';

const RequestsPage = () => {
  const { type, requestId } = useParams();
  const [filter, setFilter] = useState('all');

  // Render content based on the route parameter
  const renderContent = () => {
    // Single request detail view
    if (requestId) {
      return <RequestDetail />;
    }
    
    // Create new request form
    if (type === 'new') {
      return <RequestForm />;
    }
    
    // User requests list
    if (type === 'my') {
      return (
        <>
          <h1 className="text-2xl font-bold mb-6">My Requests</h1>
          <div className="card">
            <RequestList type="my" />
          </div>
        </>
      );
    }
    
    // Assigned requests list
    if (type === 'assigned') {
      return (
        <>
          <h1 className="text-2xl font-bold mb-6">Requests Assigned to Me</h1>
          <div className="card">
            <RequestList type="assigned" />
          </div>
        </>
      );
    }
    
    // All requests list with filtering (for admins and facility heads)
    return (
      <>
        <h1 className="text-2xl font-bold mb-6">All Requests</h1>
        
        <div className="card mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`btn ${filter === 'unassigned' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('unassigned')}
            >
              Unassigned
            </button>
            <button
              className={`btn ${filter === 'assigned' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('assigned')}
            >
              Assigned
            </button>
            <button
              className={`btn ${filter === 'progress' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('progress')}
            >
              In Progress
            </button>
            <button
              className={`btn ${filter === 'closed' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('closed')}
            >
              Closed
            </button>
          </div>
        </div>
        
        <div className="card">
          {/* In a real implementation, would filter requests by status */}
          <RequestList type="all" />
        </div>
      </>
    );
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
