
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // Navigation links based on user role
  const getNavLinks = () => {
    const links = [
      {
        to: '/dashboard',
        label: 'Dashboard',
        icon: '📊',
        allowedRoles: ['admin', 'facility-head', 'assignee', 'student', 'faculty', 'lab-assistant', 'staff']
      },
      {
        to: '/requests/new',
        label: 'Create Request',
        icon: '➕',
        allowedRoles: ['student', 'faculty', 'lab-assistant', 'staff']
      },
      {
        to: '/requests/my',
        label: 'My Requests',
        icon: '📝',
        allowedRoles: ['student', 'faculty', 'lab-assistant', 'staff']
      },
      {
        to: '/requests/assigned',
        label: 'Assigned to Me',
        icon: '🔧',
        allowedRoles: ['assignee']
      },
      {
        to: '/requests',
        label: 'All Requests',
        icon: '📋',
        allowedRoles: ['admin', 'facility-head']
      },
      {
        to: '/facilities',
        label: 'Facilities',
        icon: '🏢',
        allowedRoles: ['admin', 'facility-head']
      },
      {
        to: '/reports',
        label: 'Reports',
        icon: '📊',
        allowedRoles: ['admin', 'facility-head']
      },
      {
        to: '/help',
        label: 'Help',
        icon: '❓',
        allowedRoles: ['admin', 'facility-head', 'assignee', 'student', 'faculty', 'lab-assistant', 'staff']
      }
    ];
    
    // Filter links based on user role
    if (!currentUser) return [];
    
    return links.filter(link => 
      link.allowedRoles.includes(currentUser.role)
    );
  };
  
  return (
    <aside className="bg-white shadow-sm w-64 min-h-screen fixed left-0 top-0 pt-16 hidden md:block">
      <div className="p-4">
        <div className="mb-4">
          <div className="font-medium text-gray-500 uppercase tracking-wider text-xs">
            Main Menu
          </div>
        </div>
        
        <nav>
          <ul>
            {getNavLinks().map((link) => (
              <li key={link.to}>
                <Link 
                  to={link.to}
                  className={`flex items-center px-4 py-2 rounded-md mb-1 ${
                    location.pathname === link.to 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
          </div>
          <div>
            <div className="font-medium">{currentUser?.name}</div>
            <div className="text-xs text-gray-500 capitalize">{currentUser?.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
