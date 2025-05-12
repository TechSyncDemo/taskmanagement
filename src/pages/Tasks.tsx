import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Layout } from '../components/layout/Layout';
import { TaskList } from '../components/tasks/TaskList';
import { useTask } from '../context/TaskContext';
import { useUser } from '../context/UserContext';

export const Tasks: React.FC = () => {
  const { state: taskState, fetchTasks } = useTask();
  const { state: userState, fetchUsers } = useUser();
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const loadingRef = useRef(false);

  const fetchAllData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      await Promise.all([
        fetchTasks(),
        fetchUsers()
      ]);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      }
    } finally {
      if (mountedRef.current) {
        loadingRef.current = false;
      }
    }
  }, [fetchTasks, fetchUsers]);

  useEffect(() => {
    const controller = new AbortController();
    fetchAllData();

    return () => {
      mountedRef.current = false;
      controller.abort();
    };
  }, [fetchAllData]);

  const { tasks } = taskState;
  const { users } = userState;

  if (error) {
    return (
      <Layout>
        <div className="text-red-600">Error: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tasks</h1>
        <p className="text-gray-600">
          Manage your tasks, assign work and track progress.
        </p>
      </div>
      
      {loadingRef.current ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <TaskList tasks={tasks} users={users} />
      )}
    </Layout>
  );
};