import React from 'react';
import { Task } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';

interface TasksByPriorityChartProps {
  tasks: Task[];
}

export const TasksByPriorityChart: React.FC<TasksByPriorityChartProps> = ({ tasks }) => {
  // Calculate count for each priority
  const highCount = tasks.filter((task) => task.priority === 'high').length;
  const mediumCount = tasks.filter((task) => task.priority === 'medium').length;
  const lowCount = tasks.filter((task) => task.priority === 'low').length;
  
  const total = tasks.length;
  
  // Simple bar chart - the max height is 150px
  const maxBarHeight = 150;
  const maxCount = Math.max(highCount, mediumCount, lowCount) || 1; // Avoid division by zero
  
  const getBarHeight = (count: number) => {
    return Math.max(30, (count / maxCount) * maxBarHeight); // Minimum height of 30px
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">Tasks by Priority</h3>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="flex items-end justify-around h-[180px]">
          <div className="flex flex-col items-center">
            <div 
              className="w-16 bg-red-500 rounded-t-md"
              style={{ height: `${getBarHeight(highCount)}px` }}
            ></div>
            <div className="mt-2 text-xs text-gray-600 text-center">High</div>
            <div className="mt-1 text-base font-semibold text-gray-800">{highCount}</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div 
              className="w-16 bg-amber-500 rounded-t-md"
              style={{ height: `${getBarHeight(mediumCount)}px` }}
            ></div>
            <div className="mt-2 text-xs text-gray-600 text-center">Medium</div>
            <div className="mt-1 text-base font-semibold text-gray-800">{mediumCount}</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div 
              className="w-16 bg-blue-500 rounded-t-md"
              style={{ height: `${getBarHeight(lowCount)}px` }}
            ></div>
            <div className="mt-2 text-xs text-gray-600 text-center">Low</div>
            <div className="mt-1 text-base font-semibold text-gray-800">{lowCount}</div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Total Tasks: {total}
        </div>
      </CardContent>
    </Card>
  );
};