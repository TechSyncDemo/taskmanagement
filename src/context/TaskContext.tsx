import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TaskState, Task } from '../types';

type TaskAction =
  | { type: 'FETCH_TASKS_REQUEST' }
  | { type: 'FETCH_TASKS_SUCCESS'; payload: Task[] }
  | { type: 'FETCH_TASKS_FAILURE'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string };

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_TASKS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

interface TaskContextType {
  state: TaskState;
  fetchTasks: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Mock functions - in a real app, these would call an API
  const fetchTasks = () => {
    dispatch({ type: 'FETCH_TASKS_REQUEST' });

    // Simulate API call
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Complete project documentation',
          description: 'Write and compile all project documentation',
          status: 'todo',
          priority: 'high',
          assignedTo: '2',
          assignedBy: '1',
          dueDate: '2025-04-15',
          createdAt: '2025-04-01T10:00:00Z',
          updatedAt: '2025-04-01T10:00:00Z',
        },
        {
          id: '2',
          title: 'Review code changes',
          description: 'Review PR and provide feedback',
          status: 'in-progress',
          priority: 'medium',
          assignedTo: '3',
          assignedBy: '1',
          dueDate: '2025-04-10',
          createdAt: '2025-04-02T09:00:00Z',
          updatedAt: '2025-04-02T09:00:00Z',
        },
        {
          id: '3',
          title: 'Fix bugs in checkout process',
          description: 'Address issues reported in the checkout flow',
          status: 'completed',
          priority: 'high',
          assignedTo: '2',
          assignedBy: '3',
          dueDate: '2025-04-05',
          createdAt: '2025-04-03T11:00:00Z',
          updatedAt: '2025-04-05T16:30:00Z',
        },
        {
          id: '4',
          title: 'Update dependency packages',
          description: 'Update all npm packages to latest versions',
          status: 'todo',
          priority: 'low',
          assignedTo: '1',
          assignedBy: '1',
          dueDate: '2025-04-20',
          createdAt: '2025-04-04T14:00:00Z',
          updatedAt: '2025-04-04T14:00:00Z',
        },
      ];
      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: mockTasks });
    }, 1000);
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now,
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task: Task) => {
    const updatedTask: Task = {
      ...task,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <TaskContext.Provider
      value={{ state, fetchTasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};