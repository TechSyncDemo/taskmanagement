import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { PriorityBadge, StatusBadge } from '../ui/Badge';

// Mock activity data - in a real app, this would come from an API
const activities = [
  {
    id: '1',
    type: 'task_created',
    user: 'Admin User',
    task: 'Update project documentation',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'task_assigned',
    user: 'John Doe',
    assignedTo: 'Sarah Wilson',
    task: 'Fix checkout bug',
    time: '3 hours ago',
  },
  {
    id: '3',
    type: 'task_status_changed',
    user: 'Jane Smith',
    task: 'Create new landing page',
    newStatus: 'completed',
    time: '5 hours ago',
  },
  {
    id: '4',
    type: 'task_priority_changed',
    user: 'Admin User',
    task: 'Prepare for client meeting',
    newPriority: 'high',
    time: '8 hours ago',
  },
  {
    id: '5',
    type: 'task_completed',
    user: 'Sarah Wilson',
    task: 'Review pull request #42',
    time: '1 day ago',
  },
];

export const RecentActivities: React.FC = () => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div key={activity.id} className="px-6 py-3 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{activity.user}</span>{' '}
                    <ActivityDescription activity={activity} />
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconClasses = {
    task_created: 'bg-green-100 text-green-600',
    task_assigned: 'bg-blue-100 text-blue-600',
    task_status_changed: 'bg-amber-100 text-amber-600',
    task_priority_changed: 'bg-purple-100 text-purple-600',
    task_completed: 'bg-emerald-100 text-emerald-600',
  }[type] || 'bg-gray-100 text-gray-600';

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconClasses}`}>
      {type === 'task_created' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )}
      {type === 'task_assigned' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      )}
      {type === 'task_status_changed' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clipRule="evenodd" />
          <path d="M10 13a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      )}
      {type === 'task_priority_changed' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      )}
      {type === 'task_completed' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
};

const ActivityDescription: React.FC<{ activity: any }> = ({ activity }) => {
  switch (activity.type) {
    case 'task_created':
      return (
        <>
          created a new task: <span className="font-medium text-gray-700">"{activity.task}"</span>
        </>
      );
    case 'task_assigned':
      return (
        <>
          assigned <span className="font-medium text-gray-700">"{activity.task}"</span> to{' '}
          <span className="font-medium text-gray-700">{activity.assignedTo}</span>
        </>
      );
    case 'task_status_changed':
      return (
        <>
          changed status of <span className="font-medium text-gray-700">"{activity.task}"</span> to{' '}
          <StatusBadge status={activity.newStatus as any} />
        </>
      );
    case 'task_priority_changed':
      return (
        <>
          changed priority of <span className="font-medium text-gray-700">"{activity.task}"</span> to{' '}
          <PriorityBadge priority={activity.newPriority as any} />
        </>
      );
    case 'task_completed':
      return (
        <>
          completed the task: <span className="font-medium text-gray-700">"{activity.task}"</span>
        </>
      );
    default:
      return null;
  }
};