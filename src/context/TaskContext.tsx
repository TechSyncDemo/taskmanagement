import React, { createContext, useContext, useReducer, useCallback, useMemo, ReactNode } from 'react';
import { TaskState, Task } from '../types';

type TaskAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_ERROR'; payload: string }
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
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
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
  fetchTasks: () => void; // Changed from Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        const now = new Date().toISOString();
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Complete Project Setup',
            description: 'Initial project configuration',
            status: 'completed',
            priority: 'high',
            assignedTo: '1',
            assignedBy: '1',
            dueDate: now,
            createdAt: now,
            updatedAt: now
          },
          {
            id: '2',
            title: 'Design Review',
            description: 'Review new design proposals',
            status: 'in-progress',
            priority: 'medium',
            assignedTo: '2',
            assignedBy: '1',
            dueDate: now,
            createdAt: now,
            updatedAt: now
          }
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (isSubscribed) {
          dispatch({ type: 'SET_TASKS', payload: mockTasks });
        }
      } catch (error) {
        if (isSubscribed) {
          dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to fetch tasks' });
        }
      } finally {
        if (isSubscribed) {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    fetchData();
  }, []);

  const value = useMemo(() => ({
    state,
    fetchTasks
  }), [state, fetchTasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};