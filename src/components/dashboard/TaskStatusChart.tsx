import React from 'react';
import { Task } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';

interface TaskStatusChartProps {
  tasks: Task[];
}

export const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ tasks }) => {
  // Calculate count for each status
  const todoCount = tasks.filter((task) => task.status === 'todo').length;
  const inProgressCount = tasks.filter((task) => task.status === 'in-progress').length;
  const completedCount = tasks.filter((task) => task.status === 'completed').length;
  
  const total = tasks.length || 1; // Avoid division by zero
  
  const todoPercentage = Math.round((todoCount / total) * 100);
  const inProgressPercentage = Math.round((inProgressCount / total) * 100);
  const completedPercentage = Math.round((completedCount / total) * 100);
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">Task Status Overview</h3>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="mb-6">
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div 
                className="bg-gray-400 h-full" 
                style={{ width: `${todoPercentage}%` }}
              ></div>
              <div 
                className="bg-amber-400 h-full" 
                style={{ width: `${inProgressPercentage}%` }}
              ></div>
              <div 
                className="bg-emerald-400 h-full" 
                style={{ width: `${completedPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">{todoCount}</div>
            <div className="mt-1 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
              <span className="text-xs text-gray-500">To Do</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{inProgressCount}</div>
            <div className="mt-1 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
              <span className="text-xs text-gray-500">In Progress</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{completedCount}</div>
            <div className="mt-1 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};