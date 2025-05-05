import React from 'react';
import { User } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { BarChart2, CheckCircle, Clock } from 'lucide-react';

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg mr-4">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Badge variant={user.role === 'admin' ? 'info' : 'default'}>
                  {user.role}
                </Badge>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tasks Completed</p>
                    <p className="font-semibold text-gray-900">{user.tasksCompleted || 0}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">In Progress</p>
                    <p className="font-semibold text-gray-900">{user.tasksInProgress || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart2 size={16} className="text-indigo-600" />
                  <span className="text-sm text-gray-700">Performance Score</span>
                </div>
                <div className="relative w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full ${
                      user.performanceScore && user.performanceScore >= 80 
                        ? 'bg-green-500' 
                        : user.performanceScore && user.performanceScore >= 60 
                          ? 'bg-amber-500' 
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${user.performanceScore || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{user.performanceScore || 0}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};