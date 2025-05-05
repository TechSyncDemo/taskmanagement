import React, { useState } from 'react';
import { Task, User } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { PriorityBadge, StatusBadge } from '../ui/Badge';
import { MoreVertical, Edit2, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { TaskForm } from './TaskForm';

interface TaskCardProps {
  task: Task;
  users: User[];
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, users }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { updateTask, deleteTask } = useTask();

  const assignedUser = users.find(user => user.id === task.assignedTo)?.name || 'Unknown';
  const assignedBy = users.find(user => user.id === task.assignedBy)?.name || 'Unknown';
  
  const taskStatusColors = {
    'todo': 'border-l-4 border-gray-400',
    'in-progress': 'border-l-4 border-amber-400',
    'completed': 'border-l-4 border-emerald-400',
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask({ ...task, status: newStatus });
    setIsMenuOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const dueDate = formatDate(task.dueDate);
  const isPastDue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  if (isEditing) {
    return (
      <TaskForm 
        task={task} 
        users={users} 
        onCancel={() => setIsEditing(false)} 
        onSubmit={(updatedTask) => {
          updateTask({ ...task, ...updatedTask });
          setIsEditing(false);
        }} 
      />
    );
  }

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${taskStatusColors[task.status]}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <MoreVertical size={16} />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit2 size={14} className="mr-2" />
                  Edit Task
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => handleStatusChange('todo')}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Clock size={14} className="mr-2" />
                  Mark as To Do
                </button>
                <button
                  onClick={() => handleStatusChange('in-progress')}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Clock size={14} className="mr-2" />
                  Mark as In Progress
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <CheckCircle size={14} className="mr-2" />
                  Mark as Completed
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
        
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>Assigned to:</span>
            <span className="font-medium text-gray-700">{assignedUser}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Assigned by:</span>
            <span className="font-medium text-gray-700">{assignedBy}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-4 py-2 text-xs flex justify-between items-center">
        <div className={`flex items-center ${isPastDue ? 'text-red-600' : 'text-gray-500'}`}>
          <Clock size={14} className="mr-1" />
          <span>{isPastDue ? 'Overdue: ' : 'Due: '}{dueDate}</span>
        </div>
        <span className="text-gray-500">
          {task.status === 'completed' ? 'Completed' : 'Created'}: {formatDate(task.status === 'completed' ? task.updatedAt : task.createdAt)}
        </span>
      </CardFooter>
    </Card>
  );
};