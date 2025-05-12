import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [role, setRole] = useState<'admin' | 'staff'>('staff');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [state.isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setError(null);

      try {
        await login(credentials.email, credentials.password, role);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

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
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                error={errors.email}
                placeholder="john@example.com"
                fullWidth
              />

              <Input
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                error={errors.password}
                placeholder="••••••••"
                fullWidth
              />

              {error && (
                <div className="mt-2 p-2 bg-red-50 text-red-600 text-sm rounded-md">
                  {error}
                </div>
              )}

              <div className="mt-6">
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
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