
import React from 'react';
import Navbar from '../components/ui/Navbar';
import Sidebar from '../components/ui/Sidebar';

const HelpPage = () => {
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="main-content">
          <h1 className="text-2xl font-bold mb-6">Help & Documentation</h1>
          
          <div className="card mb-6">
            <div className="card-header">
              <h2 className="card-title">About Campus Help Desk</h2>
            </div>
            
            <p className="mb-4">
              The Campus Help Desk system is designed to streamline and automate the workflow of service requests for various
              campus facilities. This comprehensive system allows students, faculty, and staff to report issues, track their status,
              and communicate with facility managers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Guide */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">User Guide</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Creating a Request</h3>
                  <p className="text-gray-600">
                    To create a new service request, navigate to "Create Request" in the sidebar menu or dashboard.
                    Fill in the required information including the facility, severity level, and a detailed description
                    of the issue.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Tracking Your Requests</h3>
                  <p className="text-gray-600">
                    View all your requests by clicking on "My Requests" in the sidebar menu. You can see the status
                    of each request and any updates or comments from the facility staff.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Closing a Request</h3>
                  <p className="text-gray-600">
                    If your issue has been resolved, you can close the request by viewing the request details and
                    clicking the "Close Request" button. You'll be asked to provide a reason for closing.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Changing Your Password</h3>
                  <p className="text-gray-600">
                    To change your password, go to your Profile page and use the Change Password form at the bottom
                    of the page.
                  </p>
                </div>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">What are the severity levels?</h3>
                  <p className="text-gray-600">
                    <strong>Low:</strong> Minor issues that don't affect functionality.<br />
                    <strong>Medium:</strong> Issues that affect functionality but have workarounds.<br />
                    <strong>High:</strong> Significant issues affecting multiple users.<br />
                    <strong>Critical:</strong> Severe issues requiring immediate attention.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">How long will it take to resolve my request?</h3>
                  <p className="text-gray-600">
                    Resolution time depends on the severity level and complexity of the issue.
                    Critical issues are typically addressed within 24 hours, while lower severity
                    issues may take several days.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Who can see my requests?</h3>
                  <p className="text-gray-600">
                    Your requests can be seen by you, the facility head responsible for the area,
                    and the staff member assigned to resolve the issue.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">What do the different statuses mean?</h3>
                  <p className="text-gray-600">
                    <strong>Unassigned:</strong> Request has been created but not yet assigned.<br />
                    <strong>Assigned:</strong> Request has been assigned to staff but work hasn't started.<br />
                    <strong>In Progress:</strong> Work has begun on resolving the issue.<br />
                    <strong>Closed:</strong> The issue has been resolved.<br />
                    <strong>Rejected:</strong> The request has been denied with an explanation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Support */}
          <div className="card mt-6">
            <div className="card-header">
              <h2 className="card-title">Need More Help?</h2>
            </div>
            
            <p className="mb-4">
              If you need additional assistance with the Campus Help Desk system, please contact the system administrator:
            </p>
            
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>Email:</strong> helpdesk-admin@campus.edu</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Office:</strong> IT Services, Building C, Room 101</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
