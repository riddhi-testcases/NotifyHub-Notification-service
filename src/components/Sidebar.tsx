import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Bell, Users, PlusCircle, Menu, X } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { to: '/', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/users', icon: <Users size={20} />, text: 'Users' },
    { to: '/create-notification', icon: <PlusCircle size={20} />, text: 'New Notification' },
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) => `
            flex items-center px-4 py-3 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200
            ${isActive ? 'text-blue-600 bg-blue-50 font-medium' : ''}
          `}
          onClick={() => setMobileOpen(false)}
        >
          <span className="mr-3">{item.icon}</span>
          {(expanded || mobileOpen) && <span>{item.text}</span>}
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-gray-500"
        onClick={toggleMobileSidebar}
        aria-label="Toggle mobile menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar for mobile */}
      <aside
        className={`
          md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-600">Notify Hub</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        <nav className="mt-4 px-2 space-y-1">{renderNavItems()}</nav>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`
          hidden md:block bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${expanded ? 'w-64' : 'w-20'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {expanded ? (
            <h2 className="text-xl font-bold text-blue-600">Notify Hub</h2>
          ) : (
            <div className="w-full flex justify-center">
              <Bell size={24} className="text-blue-600" />
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {expanded ? (
              <X size={20} className="text-gray-500" />
            ) : (
              <Menu size={20} className="text-gray-500" />
            )}
          </button>
        </div>
        <nav className={`mt-4 ${expanded ? 'px-2' : 'px-1'} space-y-1`}>
          {renderNavItems()}
        </nav>
      </aside>
    </>
  );
};