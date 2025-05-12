import React, { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { UserList } from '../components/users/UserList';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const Users: React.FC = () => {
  const { state: userState, fetchUsers } = useUser();
  const { state: authState } = useAuth();
  
  const isAdmin = authState.user?.role === 'admin';
  
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isAdmin) {
          await fetchUsers();
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch users:', error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchUsers, isAdmin]);
  
  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  const { users, loading } = userState;
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Users</h1>
        <p className="text-gray-600">
          Manage your team members and monitor their performance.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <UserList users={users} />
      )}
    </Layout>
  );
};