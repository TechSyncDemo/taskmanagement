import React, { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { TaskList } from '../components/tasks/TaskList';
import { useTask } from '../context/TaskContext';
import { useUser } from '../context/UserContext';

export const Tasks: React.FC = () => {
  const { state: taskState, fetchTasks } = useTask();
  const { state: userState, fetchUsers } = useUser();
  
  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [fetchTasks, fetchUsers]);
  
  const { tasks, loading } = taskState;
  const { users } = userState;
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tasks</h1>
        <p className="text-gray-600">
          Manage your tasks, assign work and track progress.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <TaskList tasks={tasks} users={users} />
      )}
    </Layout>
  );
};