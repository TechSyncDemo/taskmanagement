import React, { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { OverviewCard } from '../components/dashboard/OverviewCard';
import { TaskStatusChart } from '../components/dashboard/TaskStatusChart';
import { TasksByPriorityChart } from '../components/dashboard/TasksByPriorityChart';
import { RecentActivities } from '../components/dashboard/RecentActivities';
import { useTask } from '../context/TaskContext';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Clock, Users, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { state: taskState, fetchTasks } = useTask();
  const { state: userState, fetchUsers } = useUser();
  const { state: authState } = useAuth();
  
  const isAdmin = authState.user?.role === 'admin';
  
  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [fetchTasks, fetchUsers]);
  
  const { tasks } = taskState;
  const { users } = userState;
  
  // Calculate task stats
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  
  // Calculate high priority tasks
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {authState.user?.name}! Here's an overview of your tasks and team performance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <OverviewCard
          title="Total Tasks"
          value={tasks.length}
          icon={<Clock size={24} className="text-indigo-600" />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <OverviewCard
          title="In Progress"
          value={inProgressTasks}
          icon={<Clock size={24} className="text-amber-600" />}
          trend={{ value: 5, isPositive: true }}
        />
        
        <OverviewCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle size={24} className="text-emerald-600" />}
          trend={{ value: 8, isPositive: true }}
        />
        
        {isAdmin ? (
          <OverviewCard
            title="Team Members"
            value={users.length}
            icon={<Users size={24} className="text-blue-600" />}
          />
        ) : (
          <OverviewCard
            title="High Priority"
            value={highPriorityTasks}
            icon={<AlertTriangle size={24} className="text-red-600" />}
            trend={{ value: 2, isPositive: false }}
          />
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TaskStatusChart tasks={tasks} />
        <TasksByPriorityChart tasks={tasks} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecentActivities />
      </div>
    </Layout>
  );
};