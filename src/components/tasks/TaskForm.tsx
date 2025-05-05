import React, { useState } from 'react';
import { Task, User } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TaskFormProps {
  task?: Task;
  users: User[];
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, users, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<Task['status']>(task?.status || 'todo');
  const [priority, setPriority] = useState<Task['priority']>(task?.priority || 'medium');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!assignedTo) {
      newErrors.assignedTo = 'Assignee is required';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      title,
      description,
      status,
      priority,
      assignedTo,
      assignedBy: task?.assignedBy || '1', // In a real app, this would be the current user's ID
      dueDate,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 shadow-md">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              placeholder="Enter task title"
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`block w-full px-4 py-2 text-gray-900 bg-white rounded-md border 
                  ${errors.description ? 'border-red-500' : 'border-gray-300'} 
                  focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500
                  transition duration-150 ease-in-out`}
                rows={3}
                placeholder="Enter task description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Task['status'])}
                  className="block w-full px-4 py-2 text-gray-900 bg-white rounded-md border border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500
                    transition duration-150 ease-in-out"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Task['priority'])}
                  className="block w-full px-4 py-2 text-gray-900 bg-white rounded-md border border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500
                    transition duration-150 ease-in-out"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To
                </label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className={`block w-full px-4 py-2 text-gray-900 bg-white rounded-md border 
                    ${errors.assignedTo ? 'border-red-500' : 'border-gray-300'} 
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500
                    transition duration-150 ease-in-out`}
                >
                  <option value="">Select assignee</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
                {errors.assignedTo && (
                  <p className="mt-1 text-sm text-red-600">{errors.assignedTo}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  error={errors.dueDate}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};