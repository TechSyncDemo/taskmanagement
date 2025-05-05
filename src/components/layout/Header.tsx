import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { state } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notificationCount = 3; // Example notification count

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-2 lg:ml-0">
          {state.user?.role === 'admin' ? 'Admin Dashboard' : 'Staff Dashboard'}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50">
                  <p className="text-sm text-gray-800">New task assigned to you</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
                <div className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50">
                  <p className="text-sm text-gray-800">Your task was marked as completed</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
                <div className="px-4 py-2 hover:bg-gray-50">
                  <p className="text-sm text-gray-800">Reminder: Task deadline approaching</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {state.user?.name.charAt(0)}
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-700">
            {state.user?.name}
          </span>
        </div>
      </div>
    </header>
  );
};