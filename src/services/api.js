
// This is a mock API service for development
// Replace these functions with actual API calls when connecting to your backend

/**
 * Authentication Services
 */
export const authService = {
  login: async (email, password) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // }).then(res => res.json());
    
    // Dummy implementation
    const { users } = await import('../data/dummyData');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          // Remove password from user data before storing in local state
          const { password, ...userWithoutPassword } = user;
          resolve({ success: true, user: userWithoutPassword });
        } else {
          reject({ success: false, message: 'Invalid email or password' });
        }
      }, 800);
    });
  },
  
  register: async (userData) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // }).then(res => res.json());
    
    // Dummy implementation
    const { users } = await import('../data/dummyData');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
          reject({ success: false, message: 'Email already registered' });
          return;
        }
        
        // Create new user with ID
        const newUser = {
          id: users.length + 1,
          ...userData,
          createdAt: new Date().toISOString()
        };
        
        // In real implementation this would save to database
        // For now just log the new user
        console.log('New user registered:', newUser);
        
        // Return success without password
        const { password, ...userWithoutPassword } = newUser;
        resolve({ success: true, user: userWithoutPassword });
      }, 800);
    });
  },
  
  changePassword: async (userId, oldPassword, newPassword) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/auth/change-password', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId, oldPassword, newPassword })
    // }).then(res => res.json());
    
    // Dummy implementation
    const { users } = await import('../data/dummyData');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.id === userId);
        if (user && user.password === oldPassword) {
          console.log(`Password changed for user ${userId}`);
          resolve({ success: true, message: 'Password changed successfully' });
        } else {
          reject({ success: false, message: 'Current password is incorrect' });
        }
      }, 800);
    });
  }
};

/**
 * Request Services
 */
export const requestService = {
  getAll: async () => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/requests').then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(requests);
      }, 500);
    });
  },
  
  getUserRequests: async (userId) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/users/${userId}/requests`).then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        const userRequests = requests.filter(r => r.createdBy === userId);
        resolve(userRequests);
      }, 500);
    });
  },
  
  getAssignedRequests: async (userId) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/users/${userId}/assigned`).then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignedRequests = requests.filter(r => r.assignedTo === userId);
        resolve(assignedRequests);
      }, 500);
    });
  },
  
  getRequestById: async (requestId) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/requests/${requestId}`).then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const request = requests.find(r => r.id === parseInt(requestId));
        if (request) {
          resolve(request);
        } else {
          reject({ message: 'Request not found' });
        }
      }, 300);
    });
  },
  
  createRequest: async (requestData) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/requests', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(requestData)
    // }).then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRequest = {
          id: requests.length + 1,
          ...requestData,
          status: 'unassigned',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          comments: []
        };
        
        console.log('New request created:', newRequest);
        
        // In a real app, this would actually add to the database
        resolve(newRequest);
      }, 800);
    });
  },
  
  updateRequestStatus: async (requestId, newStatus, comment = null) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/requests/${requestId}/status`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus, comment })
    // }).then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const request = requests.find(r => r.id === parseInt(requestId));
        if (request) {
          const updatedRequest = {
            ...request,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
          
          if (comment) {
            const newComment = {
              id: request.comments.length + 1,
              requestId: parseInt(requestId),
              userId: comment.userId,
              content: comment.content,
              createdAt: new Date().toISOString()
            };
            updatedRequest.comments = [...request.comments, newComment];
          }
          
          console.log('Request updated:', updatedRequest);
          resolve(updatedRequest);
        } else {
          reject({ message: 'Request not found' });
        }
      }, 500);
    });
  },
  
  assignRequest: async (requestId, assigneeId) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/requests/${requestId}/assign`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ assigneeId })
    // }).then(res => res.json());
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Assigned request ${requestId} to user ${assigneeId}`);
        resolve({
          success: true,
          message: 'Request assigned successfully'
        });
      }, 500);
    });
  },
  
  addComment: async (requestId, commentData) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/requests/${requestId}/comments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(commentData)
    // }).then(res => res.json());
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment = {
          id: Date.now(),
          requestId: parseInt(requestId),
          ...commentData,
          createdAt: new Date().toISOString()
        };
        
        console.log('Comment added:', newComment);
        resolve(newComment);
      }, 500);
    });
  }
};

/**
 * Facility Services
 */
export const facilityService = {
  getAll: async () => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/facilities').then(res => res.json());
    
    // Dummy implementation
    const { facilities } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(facilities);
      }, 500);
    });
  },
  
  getFacilityById: async (facilityId) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/facilities/${facilityId}`).then(res => res.json());
    
    // Dummy implementation
    const { facilities } = await import('../data/dummyData');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const facility = facilities.find(f => f.id === parseInt(facilityId));
        if (facility) {
          resolve(facility);
        } else {
          reject({ message: 'Facility not found' });
        }
      }, 300);
    });
  },
  
  getFacilityRequests: async (facilityId) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/facilities/${facilityId}/requests`).then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        const facilityRequests = requests.filter(r => r.facilityId === parseInt(facilityId));
        resolve(facilityRequests);
      }, 500);
    });
  }
};

/**
 * User Services
 */
export const userService = {
  getAll: async () => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/users').then(res => res.json());
    
    // Dummy implementation
    const { users } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        // Remove passwords from user data
        const sanitizedUsers = users.map(({ password, ...user }) => user);
        resolve(sanitizedUsers);
      }, 500);
    });
  },
  
  getUserById: async (userId) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/users/${userId}`).then(res => res.json());
    
    // Dummy implementation
    const { users } = await import('../data/dummyData');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.id === parseInt(userId));
        if (user) {
          // Remove password from user data
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject({ message: 'User not found' });
        }
      }, 300);
    });
  },
  
  getUsersByRole: async (role) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/users?role=${role}`).then(res => res.json());
    
    // Dummy implementation
    const { users } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredUsers = users
          .filter(u => u.role === role)
          .map(({ password, ...user }) => user);
        resolve(filteredUsers);
      }, 500);
    });
  },
  
  getFacilityAssignees: async () => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/users?role=assignee').then(res => res.json());
    
    // Dummy implementation
    const { users } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        const assignees = users
          .filter(u => u.role === 'assignee')
          .map(({ password, ...user }) => user);
        resolve(assignees);
      }, 500);
    });
  }
};

/**
 * Helper Data Services
 */
export const helperService = {
  getSeverityLevels: async () => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/severity-levels').then(res => res.json());
    
    // Dummy implementation
    const { severityLevels } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(severityLevels);
      }, 300);
    });
  },
  
  getRequestStatuses: async () => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch('/api/request-statuses').then(res => res.json());
    
    // Dummy implementation
    const { requestStatuses } = await import('../data/dummyData');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(requestStatuses);
      }, 300);
    });
  }
};

/**
 * Report Services
 */
export const reportService = {
  getFacilityStats: async (facilityId, startDate, endDate) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/reports/facility/${facilityId}?start=${startDate}&end=${endDate}`).then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const facilityRequests = requests.filter(r => r.facilityId === parseInt(facilityId));
        
        // Generate dummy stats
        const stats = {
          total: facilityRequests.length,
          byStatus: {
            unassigned: facilityRequests.filter(r => r.status === 'unassigned').length,
            assigned: facilityRequests.filter(r => r.status === 'assigned').length,
            progress: facilityRequests.filter(r => r.status === 'progress').length,
            closed: facilityRequests.filter(r => r.status === 'closed').length,
            rejected: facilityRequests.filter(r => r.status === 'rejected').length,
          },
          bySeverity: {
            low: facilityRequests.filter(r => r.severityId === 1).length,
            medium: facilityRequests.filter(r => r.severityId === 2).length,
            high: facilityRequests.filter(r => r.severityId === 3).length,
            critical: facilityRequests.filter(r => r.severityId === 4).length
          },
          averageResolutionTime: "2.5 days"
        };
        
        resolve(stats);
      }, 800);
    });
  },
  
  getUserStats: async (userId, startDate, endDate) => {
    // BACKEND IMPLEMENTATION:
    // Replace with actual API call
    // Example: return await fetch(`/api/reports/user/${userId}?start=${startDate}&end=${endDate}`).then(res => res.json());
    
    // Dummy implementation
    const { requests } = await import('../data/dummyData');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const userRequests = requests.filter(r => r.createdBy === parseInt(userId));
        const assignedRequests = requests.filter(r => r.assignedTo === parseInt(userId));
        
        // Generate dummy stats
        const stats = {
          created: {
            total: userRequests.length,
            byStatus: {
              unassigned: userRequests.filter(r => r.status === 'unassigned').length,
              assigned: userRequests.filter(r => r.status === 'assigned').length,
              progress: userRequests.filter(r => r.status === 'progress').length,
              closed: userRequests.filter(r => r.status === 'closed').length,
              rejected: userRequests.filter(r => r.status === 'rejected').length,
            }
          },
          assigned: {
            total: assignedRequests.length,
            byStatus: {
              assigned: assignedRequests.filter(r => r.status === 'assigned').length,
              progress: assignedRequests.filter(r => r.status === 'progress').length,
              closed: assignedRequests.filter(r => r.status === 'closed').length,
            }
          }
        };
        
        resolve(stats);
      }, 800);
    });
  }
};
