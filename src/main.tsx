import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <UserProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </UserProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
