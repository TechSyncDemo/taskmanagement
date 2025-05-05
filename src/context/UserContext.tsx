import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UserState, User } from '../types';

type UserAction =
  | { type: 'FETCH_USERS_REQUEST' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
  | { type: 'FETCH_USERS_FAILURE'; payload: string };

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

interface UserContextType {
  state: UserState;
  fetchUsers: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Mock function - in a real app, this would call an API
  const fetchUsers = () => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });

    // Simulate API call
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          performanceScore: 95,
          tasksCompleted: 32,
          tasksInProgress: 4,
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'staff',
          performanceScore: 88,
          tasksCompleted: 24,
          tasksInProgress: 2,
        },
        {
          id: '3',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'staff',
          performanceScore: 76,
          tasksCompleted: 18,
          tasksInProgress: 5,
        },
        {
          id: '4',
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          role: 'staff',
          performanceScore: 92,
          tasksCompleted: 27,
          tasksInProgress: 1,
        },
      ];
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: mockUsers });
    }, 1000);
  };

  return (
    <UserContext.Provider value={{ state, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};