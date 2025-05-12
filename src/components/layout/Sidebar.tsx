import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DivideIcon, Home, CheckSquare, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarItemProps {
  to: string;
  icon: typeof DivideIcon;
  label: string;
  activeRoute: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon: Icon, label, activeRoute }) => {
  const isActive = activeRoute === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 mb-2 rounded-md transition-colors ${
        isActive
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
      }`}
    >
      <Icon size={20} className="mr-3" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { state, logout } = useAuth();
  const { user } = state;

  const isAdmin = user?.role === 'admin';

  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-700">TaskFlow</h1>
      </div>

      <div className="flex flex-col flex-1 px-4 py-2 overflow-y-auto">
        <SidebarItem to="/dashboard" icon={Home} label="Dashboard" activeRoute={location.pathname} />
        {/* <SidebarItem to="/tasks" icon={CheckSquare} label="Tasks" activeRoute={location.pathname} /> */}
        {isAdmin && (
          <SidebarItem to="/users" icon={Users} label="Users" activeRoute={location.pathname} />
        )}
        {isAdmin && (
          <SidebarItem to="/analytics" icon={BarChart3} label="Analytics" activeRoute={location.pathname} />
        )}
        <SidebarItem to="/settings" icon={Settings} label="Settings" activeRoute={location.pathname} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};