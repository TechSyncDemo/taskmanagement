import React, { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useTask } from '../context/TaskContext';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const Analytics: React.FC = () => {
  const { state: taskState, fetchTasks } = useTask();
  const { state: userState, fetchUsers } = useUser();
  const { state: authState } = useAuth();
  
  const isAdmin = authState.user?.role === 'admin';
  
  useEffect(() => {
    if (isAdmin) {
      fetchTasks();
      fetchUsers();
    }
  }, [fetchTasks, fetchUsers, isAdmin]);
  
  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  const { tasks } = taskState;
  const { users } = userState;
  
  // Calculate completion rate
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate average time to complete (mock data, in a real app this would use actual timestamps)
  const avgCompletionTimeInDays = 2.5;
  
  // Calculate task distribution by user
  const tasksByUser = users.map(user => {
    const userTasks = tasks.filter(task => task.assignedTo === user.id);
    const completed = userTasks.filter(task => task.status === 'completed').length;
    return {
      ...user,
      taskCount: userTasks.length,
      completedTaskCount: completed,
      completionRate: userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0,
    };
  });
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">
          Track task progress, team performance, and productivity metrics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardHeader className="px-6 py-4 bg-indigo-50">
            <h3 className="text-lg font-medium text-indigo-700">Task Completion Rate</h3>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-indigo-600"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - completionRate / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.5s ease 0s' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{completionRate}%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardHeader className="px-6 py-4 bg-emerald-50">
            <h3 className="text-lg font-medium text-emerald-700">Average Completion Time</h3>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{avgCompletionTimeInDays}</div>
              <p className="text-lg text-gray-600">Days</p>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Average time to complete tasks across all team members
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardHeader className="px-6 py-4 bg-amber-50">
            <h3 className="text-lg font-medium text-amber-700">Task Distribution</h3>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xs mb-4">
                <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.status === 'todo').length / totalTasks) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>To Do</span>
                  <span>{tasks.filter(t => t.status === 'todo').length}</span>
                </div>
                
                <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.status === 'in-progress').length / totalTasks) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>In Progress</span>
                  <span>{tasks.filter(t => t.status === 'in-progress').length}</span>
                </div>
                
                <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(tasks.filter(t => t.status === 'completed').length / totalTasks) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Completed</span>
                  <span>{tasks.filter(t => t.status === 'completed').length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 mb-6">
        <CardHeader className="px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">Team Performance</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasks Assigned
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasks Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasksByUser.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm mr-3">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.taskCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.completedTaskCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 w-24">
                          <div
                            className={`h-2.5 rounded-full ${
                              user.completionRate >= 70
                                ? 'bg-green-500'
                                : user.completionRate >= 40
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${user.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{user.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 w-24">
                          <div
                            className={`h-2.5 rounded-full ${
                              (user.performanceScore || 0) >= 70
                                ? 'bg-green-500'
                                : (user.performanceScore || 0) >= 40
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${user.performanceScore || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{user.performanceScore || 0}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};