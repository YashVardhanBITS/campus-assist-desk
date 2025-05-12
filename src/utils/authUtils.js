
// Auth utilities for managing user session

// Store user data in local storage
export const setUserData = (userData) => {
  localStorage.setItem('campus_help_desk_user', JSON.stringify(userData));
  localStorage.setItem('campus_help_desk_token', `dummy-token-${userData.id}`);
};

// Get stored user data
export const getUserData = () => {
  try {
    const userData = localStorage.getItem('campus_help_desk_user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getUserData();
};

// Get user role
export const getUserRole = () => {
  const user = getUserData();
  return user ? user.role : null;
};

// Check if user is admin
export const isAdmin = () => {
  return getUserRole() === 'admin';
};

// Check if user is facility head
export const isFacilityHead = () => {
  return getUserRole() === 'facility-head';
};

// Check if user is assignee
export const isAssignee = () => {
  return getUserRole() === 'assignee';
};

// Logout user by clearing storage
export const logout = () => {
  localStorage.removeItem('campus_help_desk_user');
  localStorage.removeItem('campus_help_desk_token');
  window.location.href = '/';
};

// Format date for display
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get status details by ID
export const getStatusDetails = async (statusId) => {
  const { requestStatuses } = await import('../data/dummyData');
  return requestStatuses.find(status => status.id === statusId);
};

// Get severity details by ID
export const getSeverityDetails = async (severityId) => {
  const { severityLevels } = await import('../data/dummyData');
  return severityLevels.find(severity => severity.id === severityId);
};
