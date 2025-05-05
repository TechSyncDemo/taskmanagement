import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'staff'>('staff');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, state } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      login(email, password, role);
    }
  };
  
  // Redirect if already authenticated
  if (state.isAuthenticated) {
    navigate('/dashboard');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">TaskFlow</h1>
          <p className="text-gray-600 mt-2">Manage tasks efficiently and boost productivity</p>
        </div>
        
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-white px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Login to your account</h2>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 text-center ${
                      role === 'staff'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setRole('staff')}
                  >
                    Staff
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 text-center ${
                      role === 'admin'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setRole('admin')}
                  >
                    Admin
                  </button>
                </div>
              </div>
              
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="john@example.com"
                fullWidth
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder="••••••••"
                fullWidth
              />
              
              {state.error && (
                <div className="mt-2 p-2 bg-red-50 text-red-600 text-sm rounded-md">
                  {state.error}
                </div>
              )}
              
              <div className="mt-6">
                <Button
                  type="submit"
                  fullWidth
                  isLoading={state.loading}
                >
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
            <p>
              Demo credentials:
              <br />
              Admin: admin@example.com / password
              <br />
              Staff: staff@example.com / password
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};