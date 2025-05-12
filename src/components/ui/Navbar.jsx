
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-primary">
              Campus Help Desk
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser && (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-gray-100">
                  Dashboard
                </Link>
                <Link to="/requests" className="px-3 py-2 rounded-md hover:bg-gray-100">
                  Requests
                </Link>
                {(currentUser.role === 'admin' || currentUser.role === 'facility-head') && (
                  <Link to="/facilities" className="px-3 py-2 rounded-md hover:bg-gray-100">
                    Facilities
                  </Link>
                )}
                <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/help" className="px-3 py-2 rounded-md hover:bg-gray-100">
                  Help
                </Link>
                <button 
                  onClick={handleLogout}
                  className="ml-4 px-3 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && currentUser && (
        <div className="md:hidden bg-white pb-3 px-4">
          <Link 
            to="/dashboard" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100 mb-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/requests" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100 mb-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Requests
          </Link>
          {(currentUser.role === 'admin' || currentUser.role === 'facility-head') && (
            <Link 
              to="/facilities" 
              className="block px-3 py-2 rounded-md hover:bg-gray-100 mb-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Facilities
            </Link>
          )}
          <Link 
            to="/profile" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100 mb-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Profile
          </Link>
          <Link 
            to="/help" 
            className="block px-3 py-2 rounded-md hover:bg-gray-100 mb-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Help
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-md text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
