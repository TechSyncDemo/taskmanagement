import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const Settings: React.FC = () => {
  const { state } = useAuth();
  const { user } = state;

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardHeader className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    defaultValue={user?.name}
                    placeholder="John Doe"
                    fullWidth
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    defaultValue={user?.email}
                    placeholder="john@example.com"
                    fullWidth
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={user?.role}
                    readOnly
                    disabled
                    className="block w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md"
                  />
                  <p className="mt-1 text-xs text-gray-500">Your role cannot be changed.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    fullWidth
                  />
                  <p className="mt-1 text-xs text-gray-500">Leave blank to keep current password.</p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="px-6 py-4 bg-gray-50 flex justify-end">
              <Button>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 mt-6">
            <CardHeader className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-xs text-gray-500">Receive emails about task assignments and updates</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="emailNotifications" 
                      id="emailNotifications" 
                      defaultChecked 
                      className="sr-only peer"
                    />
                    <div className="block h-6 bg-gray-200 rounded-full cursor-pointer w-12 peer-checked:bg-indigo-600"></div>
                    <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-7 transition-all duration-300"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Task Reminders</h4>
                    <p className="text-xs text-gray-500">Receive reminders about upcoming deadlines</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="taskReminders" 
                      id="taskReminders" 
                      defaultChecked 
                      className="sr-only peer"
                    />
                    <div className="block h-6 bg-gray-200 rounded-full cursor-pointer w-12 peer-checked:bg-indigo-600"></div>
                    <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-7 transition-all duration-300"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Weekly Digest</h4>
                    <p className="text-xs text-gray-500">Receive a weekly summary of tasks and activities</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="weeklyDigest" 
                      id="weeklyDigest" 
                      className="sr-only peer"
                    />
                    <div className="block h-6 bg-gray-200 rounded-full cursor-pointer w-12 peer-checked:bg-indigo-600"></div>
                    <div className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:left-7 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 bg-gray-50 flex justify-end">
              <Button>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardHeader className="px-6 py-4 bg-red-50">
              <h3 className="text-lg font-medium text-red-700">Danger Zone</h3>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Delete Account</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                
                <Button variant="danger" fullWidth>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 mt-6">
            <CardHeader className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Theme Settings</h3>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    <button className="w-8 h-8 rounded-full bg-indigo-600 ring-2 ring-offset-2 ring-indigo-600"></button>
                    <button className="w-8 h-8 rounded-full bg-emerald-600"></button>
                    <button className="w-8 h-8 rounded-full bg-amber-600"></button>
                    <button className="w-8 h-8 rounded-full bg-rose-600"></button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Mode
                  </label>
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      className="flex-1 py-2 px-4 text-center bg-indigo-600 text-white"
                    >
                      Light
                    </button>
                    <button
                      className="flex-1 py-2 px-4 text-center bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 bg-gray-50 flex justify-end">
              <Button>
                Apply Theme
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};