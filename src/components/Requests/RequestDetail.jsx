
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestService, userService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { formatDate, isFacilityHead, isAdmin, isAssignee } from '../../utils/authUtils';

const RequestDetail = () => {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [facility, setFacility] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [creator, setCreator] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // For status update
  const [newStatus, setNewStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  // For assigning request
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [assigning, setAssigning] = useState(false);
  
  // For adding comment
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Load request and related data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Load request
        const requestData = await requestService.getRequestById(requestId);
        setRequest(requestData);
        
        // Load facility, severity, users
        const { facilities, severityLevels } = await import('../../data/dummyData');
        const facility = facilities.find(f => f.id === requestData.facilityId);
        const severity = severityLevels.find(s => s.id === requestData.severityId);
        
        setFacility(facility);
        setSeverity(severity);
        
        // Load creator and assignee details
        if (requestData.createdBy) {
          const creator = await userService.getUserById(requestData.createdBy);
          setCreator(creator);
        }
        
        if (requestData.assignedTo) {
          const assignee = await userService.getUserById(requestData.assignedTo);
          setAssignee(assignee);
        }
        
        // Load available assignees if user is admin or facility head
        if (isFacilityHead() || isAdmin()) {
          const assigneesList = await userService.getFacilityAssignees();
          setAssignees(assigneesList);
        }
        
        // Set initial status value for the form
        setNewStatus(requestData.status);
      } catch (err) {
        console.error('Error fetching request details:', err);
        setError('Failed to load request details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [requestId]);

  // Handle status update
  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    
    try {
      setUpdatingStatus(true);
      
      // Create comment object if comment exists
      const commentObj = statusComment
        ? { userId: currentUser.id, content: statusComment }
        : null;
      
      const updatedRequest = await requestService.updateRequestStatus(
        requestId, 
        newStatus, 
        commentObj
      );
      
      // Update the request data in state
      setRequest(updatedRequest);
      
      // Reset form
      setStatusComment('');
      
      // In a real app, would trigger an email notification
      console.log('Request status updated:', updatedRequest);
      console.log('Would send email notification about status change');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Handle request assignment
  const handleAssignRequest = async (e) => {
    e.preventDefault();
    
    if (!selectedAssignee) {
      alert('Please select an assignee');
      return;
    }
    
    try {
      setAssigning(true);
      
      await requestService.assignRequest(requestId, parseInt(selectedAssignee));
      
      // Update request status to "assigned"
      const updatedRequest = await requestService.updateRequestStatus(
        requestId,
        'assigned',
        { userId: currentUser.id, content: `Request assigned to staff member` }
      );
      
      // Update local state
      setRequest(updatedRequest);
      const assignee = await userService.getUserById(parseInt(selectedAssignee));
      setAssignee(assignee);
      
      // Reset form
      setSelectedAssignee('');
      
      // In a real app, would trigger an email notification
      console.log('Request assigned:', updatedRequest);
      console.log('Would send email notification about assignment');
    } catch (err) {
      console.error('Error assigning request:', err);
      alert('Failed to assign request');
    } finally {
      setAssigning(false);
    }
  };

  // Handle adding comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      alert('Please enter a comment');
      return;
    }
    
    try {
      setAddingComment(true);
      
      const newComment = await requestService.addComment(requestId, {
        userId: currentUser.id,
        content: comment.trim()
      });
      
      // Update request in state with new comment
      setRequest(prevRequest => ({
        ...prevRequest,
        comments: [...prevRequest.comments, newComment]
      }));
      
      // Reset form
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment');
    } finally {
      setAddingComment(false);
    }
  };

  // Handle request closure by creator
  const handleCloseRequest = async () => {
    const reason = prompt('Please provide a reason for closing this request:');
    
    if (reason === null) return; // User canceled
    
    if (!reason.trim()) {
      alert('Please provide a reason for closing the request');
      return;
    }
    
    try {
      const updatedRequest = await requestService.updateRequestStatus(
        requestId,
        'closed',
        { userId: currentUser.id, content: `Request closed: ${reason}` }
      );
      
      // Update the request data in state
      setRequest(updatedRequest);
      
      // In a real app, would trigger an email notification
      console.log('Request closed:', updatedRequest);
      console.log('Would send email notification about request closure');
    } catch (err) {
      console.error('Error closing request:', err);
      alert('Failed to close request');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-6">Loading request details...</div>;
  }

  if (error || !request) {
    return (
      <div className="bg-error bg-opacity-10 text-error p-4 rounded">
        {error || 'Request not found'}
      </div>
    );
  }

  // Determine if user can update status
  // Assignees can update status of assigned requests
  const canUpdateStatus = 
    isAdmin() || 
    isFacilityHead() || 
    (isAssignee() && request.assignedTo === currentUser.id);
  
  // Determine if user can assign this request
  const canAssign = (isFacilityHead() || isAdmin()) && request.status === 'unassigned';
  
  // Determine if user can close this request (only the creator can)
  const canClose = 
    request.createdBy === currentUser.id && 
    request.status !== 'closed' && 
    request.status !== 'rejected';

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-outline mb-4"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold">{request.title}</h1>
            <div className="flex items-center mt-2">
              <span className={getStatusBadge(request.status)}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
              <span className="text-gray-500 ml-4">Request #{request.id}</span>
            </div>
          </div>
          
          {canClose && (
            <button 
              onClick={handleCloseRequest}
              className="btn btn-outline"
            >
              Close Request
            </button>
          )}
        </div>
        
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="card-title">Request Details</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Facility</p>
              <p className="font-medium">{facility?.name || 'Unknown'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Severity</p>
              <p className="font-medium">{severity?.name || 'Unknown'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Created By</p>
              <p className="font-medium">{creator?.name || 'Unknown'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">{formatDate(request.createdAt)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Assigned To</p>
              <p className="font-medium">
                {assignee?.name || 'Not Assigned'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">{formatDate(request.updatedAt)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="mt-1">{request.description}</p>
          </div>
        </div>
        
        {/* Request Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Status Update Form */}
          {canUpdateStatus && (
            <div className="card">
              <h3 className="font-medium mb-4">Update Status</h3>
              <form onSubmit={handleStatusUpdate}>
                <div className="form-group">
                  <label className="form-label" htmlFor="newStatus">Status</label>
                  <select
                    id="newStatus"
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    required
                  >
                    <option value="unassigned">Unassigned</option>
                    <option value="assigned">Assigned</option>
                    <option value="progress">Work In Progress</option>
                    <option value="closed">Closed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="statusComment">Comment (Optional)</label>
                  <textarea
                    id="statusComment"
                    className="form-textarea"
                    value={statusComment}
                    onChange={(e) => setStatusComment(e.target.value)}
                    placeholder="Add a comment about this status change"
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updatingStatus}
                >
                  {updatingStatus ? 'Updating...' : 'Update Status'}
                </button>
              </form>
            </div>
          )}
          
          {/* Assignment Form */}
          {canAssign && (
            <div className="card">
              <h3 className="font-medium mb-4">Assign Request</h3>
              <form onSubmit={handleAssignRequest}>
                <div className="form-group">
                  <label className="form-label" htmlFor="assignee">Assign To</label>
                  <select
                    id="assignee"
                    className="form-select"
                    value={selectedAssignee}
                    onChange={(e) => setSelectedAssignee(e.target.value)}
                    required
                  >
                    <option value="">Select Staff Member</option>
                    {assignees.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={assigning}
                >
                  {assigning ? 'Assigning...' : 'Assign Request'}
                </button>
              </form>
            </div>
          )}
        </div>
        
        {/* Comments Section */}
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="card-title">Comments & Updates</h2>
          </div>
          
          <div className="space-y-4">
            {request.comments?.length > 0 ? (
              request.comments.map((comment) => (
                <div key={comment.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">
                      {comment.userId === creator?.id ? creator?.name :
                       comment.userId === assignee?.id ? assignee?.name : 'Staff Member'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                  <div className="mt-1">{comment.content}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet</p>
            )}
          </div>
          
          {/* Add Comment Form */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-medium mb-4">Add Comment</h3>
            <form onSubmit={handleAddComment}>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your comment here..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={addingComment}
              >
                {addingComment ? 'Posting...' : 'Add Comment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
